const cv_parts_draggable_items = document.querySelectorAll(".candrag"); // get all elements with candrag class

// create event handlers for all elements in cv_parts_draggable_items
cv_parts_draggable_items.forEach(item => {

    // get all element with cv_parts_cb_style class
    const cv_parts_checkbox = document.querySelectorAll(".cv_parts_cb_style");

    // define dragstart event
    item.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id);    // set data of the dragged item
        cv_parts_checkbox.forEach(item2 => item2.style.pointerEvents = "none") // turn of the child (contain checkbox) divs while drag is not finished;
    });

    // Allow us to move the target
    item.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    // define the drop event
    item.addEventListener("drop", (event) => {
        event.preventDefault(); 
        event.stopPropagation(); // return only with the child
        
        const draggedItemId = event.dataTransfer.getData('text');
        const draggedItem = document.getElementById(draggedItemId);
        const main_column = document.getElementById("cv_parts_main");
        const sidebar_column = document.getElementById("cv_parts_sidebar");
        
        // allow switching the elements in rows and columns
        if (draggedItem.classList.contains("main_column")){
            if (event.target.classList.contains("sidebar_column")){
                draggedItem.classList.remove("main_column");
                draggedItem.classList.add("sidebar_column");
                sidebar_column.insertBefore(draggedItem,event.currentTarget);
            }
            else if (event.target == sidebar_column){
                draggedItem.classList.remove("main_column");
                draggedItem.classList.add("sidebar_column");
                sidebar_column.appendChild(draggedItem);
            }
            else if (event.target == main_column){
                main_column.appendChild(draggedItem);
            }
            else{
                main_column.insertBefore(draggedItem,event.currentTarget);
            }
        }
        else if (draggedItem.classList.contains("sidebar_column")){
            if (event.target.classList.contains("main_column")){
                draggedItem.classList.remove("sidebar_column");
                draggedItem.classList.add("main_column");
                main_column.insertBefore(draggedItem,event.currentTarget);
            }
            else if (event.target == main_column){
                draggedItem.classList.remove("sidebar_column");
                draggedItem.classList.add("main_column");
                main_column.appendChild(draggedItem);
            }
            else if (event.target == sidebar_column){
                sidebar_column.appendChild(draggedItem);
            }
            else{
                sidebar_column.insertBefore(draggedItem,event.currentTarget);
            }
        }
        // turn back the checkbox function
        cv_parts_checkbox.forEach(item2 => item2.style.pointerEvents = "auto");
    });
});
