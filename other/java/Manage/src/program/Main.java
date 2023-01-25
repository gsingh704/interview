package program;

public class Main {
    // define an array named clients
    public static Object[][] Clients = {
            // id , name , email
            { 1, "Joan", "joan@gmail.com" },
            { 2, "Pep", "pep@gmail.com" },
            { 3, "Anna", "anna@gmail.com" }
    };
    // define an array for providers
    public static Object[][] Providers = {
            // id , name , email
            { 1, "Joan", "joan@gmail.com" },
            { 2, "Pep", "pep@gmail.com" },
            { 3, "Anna", "anna@gmail.com" }
    };
    // define an array for potential clients
    public static Object[][] Potential = {
            // id , name , email
            { 1, "Joan", "joan@gmail.com" },
            { 2, "Pep", "pep@gmail.com" },
            { 3, "Anna", "anna@gmail.com" }
    };

    public static void main(String[] args) throws Exception {
        int option;
        do {
            System.out.println("------------------------");
            System.out.println("What do you want to do ?");
            System.out.println("1. Manage Clients");
            System.out.println("2. Manage Providers");
            System.out.println("3. Manage Potential Clients");
            System.out.println("0. Exit");
            System.out.println("------------------------");
            option = Validate.getOption(0, 3);
            switch (option) {
                case 1:
                    Clients = manageArray(Clients);
                    break;
                case 2:
                    Providers = manageArray(Clients);
                    break;
                case 3:
                    Potential = manageArray(Clients);
                    break;
                case 0:
                    System.out.println("Bye bye");
                    break;
            }
        } while (option != 0);
    }

    private static Object[][] manageArray(Object[][] Array) {
        int option1;
        do {
            System.out.println("------------------------");
            System.out.println("What do you want to do ?");
            System.out.println("1. List all contacts");
            System.out.println("2. Add a new contact");
            System.out.println("3. Delete a contact ");
            System.out.println("4. Update a contact");
            System.out.println("5. Send Email to all contacts");
            System.out.println("0. Exit  to menu");
            System.out.println("------------------------");
            option1 = Validate.getOption(0, 5);
            switch (option1) {
                case 1:
                    Common.listArray(Array);
                    break;
                case 2:
                    Array = Common.addToArray(Array);
                    break;
                case 3:
                    Array = Common.deleteArray(Array);
                    break;
                case 4:
                    Array = Common.updateArray(Array);
                    break;
                case 5:
                    Common.sendEmail(Array);
                    break;
                case 0:
                    System.out.println("Bye bye");
                    break;
            }
        } while (option1 != 0);
        return Array;
    }

}
