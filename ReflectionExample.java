import java.lang.reflect.Method;

class Student {

    public void show() {

        System.out.println("Reflection Example");
    }
}

public class ReflectionExample {
    public static void main(String[] args) {

        try {

            Class<?> cls = Class.forName("Student");

            Object obj =
                    cls.getDeclaredConstructor().newInstance();

            Method[] methods =
                    cls.getDeclaredMethods();

            for(Method m : methods) {

                System.out.println("Method: "
                        + m.getName());

                m.invoke(obj);
            }

        } catch(Exception e) {

            System.out.println(e);
        }
    }
}