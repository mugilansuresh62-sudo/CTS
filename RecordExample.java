import java.util.List;

record Person(String name, int age) {}

public class RecordExample {
    public static void main(String[] args) {

        List<Person> people = List.of(
                new Person("John", 25),
                new Person("Sam", 17),
                new Person("David", 30)
        );

        people.stream()
              .filter(p -> p.age() >= 18)
              .forEach(System.out::println);
    }
}   