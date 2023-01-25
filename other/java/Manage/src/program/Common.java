package program;
import java.io.IOException;

import java.util.Scanner;

public class Common {

    public static Scanner input = new Scanner(System.in);

    public static void listArray(Object[][] array) {
        System.out.println("------------------------");
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                System.out.printf("%-22s", array[i][j]);
            }
            System.out.println();
        }

    }

    public static Object[][] deleteArray(Object[][] array) {
        int pos;
        int id;

        System.out.println("Enter the id: ");
        id = Validate.getExistingId(array);
        pos = Validate.getPos(array, id);
        // delete the pos
        Object[][] newArray = new Object[array.length - 1][array[0].length];
        for (int i = 0; i < pos; i++) {
            newArray[i] = array[i];
        }
        for (int i = pos; i < newArray.length; i++) {
            newArray[i] = array[i + 1];
        }
        array = newArray;
        return array;
    }

    public static Object[][] addToArray(Object[][] array) {
        Object[][] newArray = new Object[array.length + 1][array[0].length];
        for (int i = 0; i < array.length; i++) {
            newArray[i] = array[i];
        }
        newArray[array.length][0] = modifyID(array);
        newArray[array.length][1] = modifyName();
        newArray[array.length][2] = modifyEmail();
        array = newArray;
        return array;
    }

    public static Object[][] updateArray(Object[][] array) {
        int id;
        int pos;
        int choice4;
        System.out.println("Enter the id: ");
        id = Validate.getExistingId(array);
        pos = Validate.getPos(array, id);
        do {
            System.out.println("1. Update ID");
            System.out.println("2. Update Name");
            System.out.println("3. Update Email");
            System.out.println("4. Exit");
            choice4 = Validate.getOption(0, 3);
            switch (choice4) {
                case 1:
                    array[pos][0] = modifyID(array);
                    break;
                case 2:
                    array[pos][1] = modifyName();
                    break;
                case 3:
                    array[pos][2] = modifyEmail();
                    break;
                case 0:
                    System.out.println("Bye bye");

                    break;
                default:
                    System.out.println("Invalid option, Try again");
            }
        } while (choice4 != 0);
        return array;
    }

    private static Object modifyEmail() {
        String email;
        System.out.println("Enter the email: ");
        email = Validate.getEmail();
        return email;
    }

    private static Object modifyName() {
        String name;
        System.out.println("Enter the name: ");
        name = Validate.getName();
        return name;
    }

    private static Object modifyID(Object[][] array) {
        int id;
        System.out.println("Enter the id: ");
        id = Validate.getNoExistID(array);
        return id;
    }

    public static void sendEmail(Object[][] clients) {
        String mailto = "mailto:";
        for (int i = 0; i < clients.length; i++) {
            mailto += clients[i][2] + ";";
        }
        mailto += "?subject=Hello%20again";

        try {
            Runtime.getRuntime().exec("firefox-esr " + mailto);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
