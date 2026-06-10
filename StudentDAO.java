import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class StudentDAO {

    static final String url =
            "jdbc:mysql://localhost:3306/studentdb";

    static final String user = "root";
    static final String password = "root";

    public static void insertStudent(int id, String name) {

        try {

            Connection con =
                    DriverManager.getConnection(url, user, password);

            String query =
                    "INSERT INTO students(id, name) VALUES(?, ?)";

            PreparedStatement ps =
                    con.prepareStatement(query);

            ps.setInt(1, id);
            ps.setString(2, name);

            ps.executeUpdate();

            System.out.println("Inserted Successfully");

            con.close();

        } catch(Exception e) {

            System.out.println(e);
        }
    }

    public static void updateStudent(int id, String newName) {

        try {

            Connection con =
                    DriverManager.getConnection(url, user, password);

            String query =
                    "UPDATE students SET name=? WHERE id=?";

            PreparedStatement ps =
                    con.prepareStatement(query);

            ps.setString(1, newName);
            ps.setInt(2, id);

            ps.executeUpdate();

            System.out.println("Updated Successfully");

            con.close();

        } catch(Exception e) {

            System.out.println(e);
        }
    }

    public static void main(String[] args) {

        insertStudent(1, "Mothi");

        updateStudent(1, "Mothish");
    }
} 