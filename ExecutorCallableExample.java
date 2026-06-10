import java.util.concurrent.*;

public class ExecutorCallableExample {

    public static void main(String[] args) {

        ExecutorService service =
                Executors.newFixedThreadPool(3);

        Callable<Integer> task1 = () -> 10 + 20;

        Callable<Integer> task2 = () -> 30 + 40;

        Callable<Integer> task3 = () -> 50 + 60;

        try {

            Future<Integer> result1 =
                    service.submit(task1);

            Future<Integer> result2 =
                    service.submit(task2);

            Future<Integer> result3 =
                    service.submit(task3);

            System.out.println(result1.get());
            System.out.println(result2.get());
            System.out.println(result3.get());

        } catch(Exception e) {

            System.out.println(e);
        }

        service.shutdown();
    }
}