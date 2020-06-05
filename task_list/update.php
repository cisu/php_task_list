<?php

include_once 'Database.php';

// update if name has been updated
if (isset($_POST['id'])) {

    $column = trim($_POST['column']);
    $theData = $_POST['theData'];
    $id = $_POST['id'];


    try {
        $updateQuery = "UPDATE tasks SET {$column}= :placeholder
                       WHERE id = :id";

        $statement = $conn->prepare($updateQuery);
        $statement->execute(array(":placeholder" => $theData, ":id" => $id));

        if ($statement->rowCount() === 1) {
            echo "Task {$column} update successfully";
        } else {
            echo "No changes made";
        }

    } catch (PDOException $ex) {
        echo "An error occurred " . $ex->getMessage();
    }

} // update if description has been updated
else if (isset($_POST['description']) && isset($_POST['id'])) {

    $description = trim($_POST['description']);
    $id = $_POST['id'];

    try {
        $updateQuery = "UPDATE tasks SET description = :description
                       WHERE id = :id";

        $statement = $conn->prepare($updateQuery);
        $statement->execute(array(":description" => $description, ":id" => $id));


        if ($statement->rowCount() === 1) {
            echo "Task description update successfully";
        } else {
            echo "No changes made";
        }

    } catch (PDOException $ex) {
        echo "An error occurred " . $ex->getMessage();
    }

} // update if status has been updated
else if (isset($_POST['status']) && isset($_POST['id'])) {

    $status = trim($_POST['status']);
    $id = $_POST['id'];

    try {
        $updateQuery = "UPDATE tasks SET status = :status
                       WHERE id = :id";

        $statement = $conn->prepare($updateQuery);
        $statement->execute(array(":status" => $status, ":id" => $id));

        if ($statement->rowCount() === 1) {
            echo "Task status update successfully";
        } else {
            echo "No changes made";
        }

    } catch (PDOException $ex) {
        echo "An error occurred " . $ex->getMessage();
    }

}