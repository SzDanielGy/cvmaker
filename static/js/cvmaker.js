const cv_parts_draggable_items = document.querySelectorAll(".candrag"); // get all elements with candrag class
const cv_parts_checkbox = document.querySelectorAll(".cv_parts_cb_style"); // get all element with cv_parts_cb_style class

const cv_main = document.querySelectorAll(".cv_main");
const cv_sidebar = document.querySelectorAll(".cv_sidebar");

// create event handlers for all elements in cv_parts_draggable_items
cv_parts_draggable_items.forEach(item => {

    // define dragstart event
    item.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id);    // set data of the dragged item
        cv_parts_checkbox.forEach(item2 => item2.style.pointerEvents = "none") // turn of the child (contain checkbox) divs while drag is not finished;
    });

    // Allow us to move the target
    item.addEventListener("dragover", (event) => {

        if (event.target == document.getElementsByClassName("sidebar_column")[0] || event.target == document.getElementsByClassName("main_column")[0]){
            return;
        }

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
        const cv_viewer_main = document.getElementById("main_content_holder");
        const cv_viewer_sidebar = document.getElementById("sidebar_content_holder");
        
        // allow switching the elements in rows and columns
        if (draggedItem.classList.contains("main_column")){
            
            let draggedItemIndex = Array.from(main_column.children).indexOf(draggedItem);
            let cv_viewer_item = document.getElementsByClassName("cv_main")[draggedItemIndex];

            if (event.target.classList.contains("sidebar_column")){
                
                let targetItemIndex = Array.from(sidebar_column.children).indexOf(event.target);
                cv_viewer_item.classList.remove("cv_main");
                cv_viewer_item.classList.add("cv_sidebar");
                cv_viewer_sidebar.insertBefore(cv_viewer_item,cv_viewer_sidebar.children[targetItemIndex]);
                
                draggedItem.classList.remove("main_column");
                draggedItem.classList.add("sidebar_column");
                sidebar_column.insertBefore(draggedItem,event.currentTarget);
                
                
            }
            else if (event.target == sidebar_column){

                cv_viewer_item.classList.remove("cv_main");
                cv_viewer_item.classList.add("cv_sidebar");
                cv_viewer_sidebar.appendChild(cv_viewer_item);

                draggedItem.classList.remove("main_column");
                draggedItem.classList.add("sidebar_column");
                sidebar_column.appendChild(draggedItem);
            }
            else if (event.target == main_column){

                cv_viewer_main.appendChild(cv_viewer_item);
                
                main_column.appendChild(draggedItem);
            }
            else{

                let targetItemIndex = Array.from(main_column.children).indexOf(event.target);
                cv_viewer_main.insertBefore(cv_viewer_item,cv_viewer_main.children[targetItemIndex]);

                main_column.insertBefore(draggedItem,event.currentTarget);
            }
        }
        else if (draggedItem.classList.contains("sidebar_column")){

            let draggedItemIndex = Array.from(sidebar_column.children).indexOf(draggedItem);
            let cv_viewer_item = document.getElementsByClassName("cv_sidebar")[draggedItemIndex];

            if (event.target.classList.contains("main_column")){
                
                let targetItemIndex = Array.from(main_column.children).indexOf(event.target);
                cv_viewer_item.classList.remove("cv_sidebar");
                cv_viewer_item.classList.add("cv_main");
                cv_viewer_main.insertBefore(cv_viewer_item,cv_viewer_main.children[targetItemIndex]);
                
                draggedItem.classList.remove("sidebar_column");
                draggedItem.classList.add("main_column");
                main_column.insertBefore(draggedItem,event.currentTarget);
            }
            else if (event.target == main_column){
                
                cv_viewer_item.classList.remove("cv_sidebar");
                cv_viewer_item.classList.add("cv_main");
                cv_viewer_main.appendChild(cv_viewer_item);
                
                draggedItem.classList.remove("sidebar_column");
                draggedItem.classList.add("main_column");
                main_column.appendChild(draggedItem);
            }
            else if (event.target == sidebar_column){

                cv_viewer_sidebar.appendChild(cv_viewer_item);

                sidebar_column.appendChild(draggedItem);
            }
            else{
                
                let targetItemIndex = Array.from(sidebar_column.children).indexOf(event.target);
                cv_viewer_sidebar.insertBefore(cv_viewer_item,cv_viewer_sidebar.children[targetItemIndex]);
                
                sidebar_column.insertBefore(draggedItem,event.currentTarget);
            }
        }
        // turn back the checkbox function
        cv_parts_checkbox.forEach(item2 => item2.style.pointerEvents = "auto");
    });
});

document.getElementById("cv_parts_main").addEventListener("change", event => {
    if (event.target && event.target.type === "checkbox") {
        const checkbox = event.target;
        const main_column_items = document.querySelectorAll(".main_column");
        const index = Array.from(main_column_items).indexOf(checkbox.closest(".main_column"));

        if (index !== -1) {
            document.querySelectorAll(".cv_main")[index].style.display = checkbox.checked ? "flex" : "none";
        }
    }
});

document.getElementById("cv_parts_sidebar").addEventListener("change", event => {
    if (event.target && event.target.type === "checkbox") {
        const checkbox = event.target;
        const sidebar_column_items = document.querySelectorAll(".sidebar_column");
        const index = Array.from(sidebar_column_items).indexOf(checkbox.closest(".sidebar_column"));

        if (index !== -1) {
            if (index == 0){
                document.getElementById("cv_viewer_portrait").style.display = checkbox.checked ? "flex" : "none";
            }
            else {
                document.querySelectorAll(".cv_sidebar")[index].style.display = checkbox.checked ? "flex" : "none";
            }
        }
    }
});