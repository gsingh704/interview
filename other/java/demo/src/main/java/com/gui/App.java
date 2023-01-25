package com.gui;

import javafx.application.Application;
import javafx.beans.property.SimpleObjectProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class App extends Application {

    public static Object[][] array = {
            // id , name , email
            { 1, "Joan", "joan@gmail.com" },
            { 2, "Pep", "pep@gmail.com" },
            { 3, "Anna", "anna@gmail.com" }
    };

    // make a window that have three tabs that let manage each array
    public static void main(String[] args) {
        launch(args);
    }

     // make a windows that shows the array in a table format
     @Override
     public void start(Stage primaryStage) throws Exception {
         primaryStage.setTitle("Hello World");
     
         // create a table
         TableView<Object[]> table = new TableView<>();
         table.setEditable(true);
     
         // create columns
         TableColumn<Object[], Integer> idColumn = new TableColumn<>("ID");
         TableColumn<Object[], String> nameColumn = new TableColumn<>("Name");
         TableColumn<Object[], String> emailColumn = new TableColumn<>("Email");
     
         // set the columns
         idColumn.setCellValueFactory(cellData -> new SimpleObjectProperty<>((Integer) cellData.getValue()[0]));
         nameColumn.setCellValueFactory(cellData -> new SimpleObjectProperty<>((String) cellData.getValue()[1]));
         emailColumn.setCellValueFactory(cellData -> new SimpleObjectProperty<>((String) cellData.getValue()[2]));
     
         // add the columns to the table
         table.getColumns().addAll(idColumn, nameColumn, emailColumn);
     
         // set the array as the items of the table
         table.setItems(FXCollections.observableArrayList(array));
     
         // create a border pane
         BorderPane borderPane = new BorderPane();
         borderPane.setCenter(table);
     
         // create a scene
         Scene scene = new Scene(borderPane, 300, 300);
     
         // set the scene
         primaryStage.setScene(scene);
         primaryStage.show();
     }
     
        
   

    

}
