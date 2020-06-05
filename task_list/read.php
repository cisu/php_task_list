<?php

include_once 'Database.php';

try {

    $readQuery = "SELECT * FROM tasks";

    $statement = $conn->query($readQuery);

    // pass the data to the manage task
    while ($task = $statement->fetch(PDO::FETCH_OBJ)) {
        // με backticks στην αρχη δεν δουλέυει, επίσης με single quotes εξωτερικά πάλι δεν έχουμε το επιθυμητό απο΄τέλεσμα
        /**
         * %b: abbreviated motnth name
         * %d: day of the month (01 to 31)
         * %Y: year including the century
         */
        $create_date = strftime("%b %d %Y", strtotime($task->created_at));
        $output = "<tr>

                    <td title='Click to edit'>
                     <div class='editable' onclick='makeElementEditable(this)' onblur=\"updateTask(this,'{$task->id}', 'name')\">$task->name</div>
                    </td>
                    
                    <td title='Click to edit'>
                     <div class='editable' onclick='makeElementEditable(this)' onblur=\"updateTask(this,'{$task->id}', 'description')\"> $task->description </div>
                    </td>
                    
                    <td title='Click to edit'> 
                     <div class='editable' onclick='makeElementEditable(this)' onblur=\"updateTask(this, '{$task->id}','status'\">$task->status</div>
                    </td>
                    
                    <td>$create_date</td>
                    
                    <td style='width: 5%;'>
                        <button class='btn-danger' onclick=\"deleteTask('{$task->id}')\">
                            <i class='btn-danger fa fa-times'></i>
                        </button>
                    </td>
                  </tr>";
        echo $output;
    }

} catch (PDOException $ex) {
    echo "An error occured ", $ex->getMessage();
}