import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class TransactionExample {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/bankdb";
        String user = "root";
        String password = "root";

        try {

            Connection con =
                    DriverManager.getConnection(url, user, password);

            con.setAutoCommit(false);

            String debitQuery =
                    "UPDATE accounts SET balance = balance - 1000 WHERE id = 1";

            String creditQuery =
                    "UPDATE accounts SET balance = balance + 1000 WHERE id = 2";

            PreparedStatement debit =
                    con.prepareStatement(debitQuery);

            PreparedStatement credit =
                    con.prepareStatement(creditQuery);

            debit.executeUpdate();
            credit.executeUpdate();

            con.commit();

            System.out.println("Transaction Successful");

            con.close();

        } catch(Exception e) {

            System.out.println("Transaction Failed");

            e.printStackTrace();
        }
    }
}