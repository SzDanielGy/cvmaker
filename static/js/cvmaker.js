const cv_parts_draggable_items = document.querySelectorAll(".candrag"); // get all elements with candrag class
const cv_parts_checkbox = document.querySelectorAll(".cv_parts_cb_style"); // get all element with cv_parts_cb_style class
const sidebar_font_frame_color = document.getElementById("sidebar_font_frame_color_input");
const sidebar_fonts = document.getElementsByClassName("cv_sidebar");
const main_fonts = document.getElementsByClassName("cv_main");
const cv_viewer_main = document.getElementById("main_content_holder");
const cv_viewer_sidebar = document.getElementById("sidebar_content_holder");
const cv_viewer_contact = document.getElementById("cv_viewer_contact");


function svgColorChanger(color){
    let svgs = document.querySelectorAll(".svg-image");
    svgs.forEach(element => {
        var svgDoc = element.contentDocument;
        var paths = svgDoc.querySelectorAll("path");
        paths.forEach(path => {
            path.setAttribute("fill", color);
        });
    });
}

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
        
        
        // allow switching the elements in rows and columns
        if (draggedItem.classList.contains("main_column")){
            
            let draggedItemIndex = Array.from(main_column.children).indexOf(draggedItem);
            let cv_viewer_item = document.getElementsByClassName("cv_main")[draggedItemIndex];

            if (event.target.classList.contains("sidebar_column")){
                
                let targetItemIndex = Array.from(sidebar_column.children).indexOf(event.target);
                cv_viewer_item.classList.remove("cv_main");
                cv_viewer_item.classList.add("cv_sidebar");
                cv_viewer_item.style.color = sidebar_font_frame_color.value;
                cv_viewer_sidebar.insertBefore(cv_viewer_item,cv_viewer_sidebar.children[targetItemIndex]);
                
                draggedItem.classList.remove("main_column");
                draggedItem.classList.add("sidebar_column");
                sidebar_column.insertBefore(draggedItem,event.currentTarget);
                
            }
            else if (event.target == sidebar_column){
                
                cv_viewer_item.classList.remove("cv_main");
                cv_viewer_item.classList.add("cv_sidebar");
                cv_viewer_sidebar.appendChild(cv_viewer_item);
                cv_viewer_item.style.color = sidebar_font_frame_color.value;
                
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
                cv_viewer_item.style.color = "black";
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
                cv_viewer_item.style.color = "black";
                
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


const ui_button_minimalize = document.getElementById("cv_maker_ui_minimalizer");
const ui_button_orientation = document.getElementById("cv_maker_ui_orientation");

ui_button_minimalize.addEventListener("click", event => {
    let button = ui_button_minimalize;
    let currentState = button.getAttribute("data-state");
    let ui_elements = document.getElementById("cv_properties").children;
    let hidable_ui_elements = Array.from(ui_elements).slice(0,-1);

    hidable_ui_elements.forEach(element => {
        if (currentState == "maximized") {
            button.setAttribute("data-state", "minimalized");
            button.querySelector("p").innerText = "Maximize";
            element.style.display = "none";
            
    
        } 
        else {
            button.querySelector("p").innerText = "Minimalize";
            button.setAttribute("data-state", "maximized");
            element.style.display = "flex";
        }
    });
});


ui_button_orientation.addEventListener("click", event => {
    let button = ui_button_orientation;
    let orientation = document.body;
    let currentState = button.getAttribute("data-state");

        if (currentState == "right") {
            button.setAttribute("data-state", "left");
            button.querySelector("p").innerText = "Switch side (right)";
            orientation.style.flexDirection = "row";

        } 
        else {
            button.setAttribute("data-state", "right");
            button.querySelector("p").innerText = "Switch side (left)";
            orientation.style.flexDirection = "row-reverse";
        }

});


const radio_sidebar_left = document.getElementById("sidebar_left");
const radio_sidebar_right = document.getElementById("sidebar_right");
const cv = document.getElementById("cv_viewer");

radio_sidebar_left.addEventListener("click",function(){
    cv.style.flexDirection = "row";
});

radio_sidebar_right.addEventListener("click",function(){
    cv.style.flexDirection = "row-reverse";
});

const sidebar_color = document.getElementById("sidebar_color_input");
const sidebar = document.getElementById("cv_viewer_sidebar");

sidebar_color.addEventListener("input",function(){
    sidebar.style.backgroundColor = sidebar_color.value;
});

function changeSidebarFontColor(color){
    picture_holder.style.borderColor = color.value;
    for (let text of sidebar_fonts) {
        text.style.color = color.value;
        text.style.setProperty("--markercolor",color.value);
    }
}

sidebar_font_frame_color.addEventListener("input",function(){
    if (document.getElementById("cv_viewer_contact").classList.contains("cv_sidebar")){
        svgColorChanger(sidebar_font_frame_color.value);
    }
    changeSidebarFontColor(sidebar_font_frame_color);
});

const portrait_picture = document.getElementById("sidebar_picture_input");
const picture_holder = document.getElementById("cv_viewer_portrait");
const picture_alt_text = document.getElementById("alt_picture");

portrait_picture.addEventListener("input",function(){
    picture_holder.style.backgroundImage = `url('${portrait_picture.value}')`;
    picture_alt_text.innerHTML = "";

});

let jsonfile = document.getElementById("text_content_input");

function nameToCV(data){
    cv_name = document.getElementById("cv_viewer_name");
    cv_name.innerHTML = data.name;
}

function simpleListToCV(data,type,jsonType){
    let element_types = document.getElementById(type);
    let title = document.createElement("p");
    title.innerHTML = data[jsonType].name;
    title.style.alignContent = "left";
    element_types.parentElement.insertBefore(title,element_types);
    data[jsonType].values.forEach(item => {
        let ul_element = document.createElement("li");
        let p_element = document.createElement("p");
        p_element.innerText = item;
        ul_element.appendChild(p_element);
        element_types.appendChild(ul_element);
    })
}

function introductionToCV(data,type,jsonType){
    let element_types = document.getElementById(type);
    let title = document.createElement("p");
    title.innerHTML = data[jsonType].name;
    title.style.alignContent = "left";
    element_types.appendChild(title);
    let p_element = document.createElement("p");
    element_types.appendChild(p_element);
    data[jsonType].sentences.forEach(item => {
        p_element.textContent += item;
    })
}

function expOrprojectToCV(data,type,jsonType){
    let element_types = document.getElementById(type);
    let title = document.createElement("p");
    title.innerHTML = data[jsonType].name;
    element_types.appendChild(title);
    data[jsonType][jsonType].forEach(element => {
        let content = document.createElement("div");
        let job_title = document.createElement("p");
        job_title.innerHTML = element.job_title;
        let date = document.createElement("p");
        date.innerHTML = element.date;
        let sentences = document.createElement("ul");
        content.append(job_title,date,sentences);
        element_types.append(content);
        element.sentences.forEach(sentence => {
            let ul_element = document.createElement("li");
            let p_element = document.createElement("p");
            p_element.innerText = sentence;
            ul_element.appendChild(p_element);
            sentences.appendChild(ul_element);
        });
    });
}

function schoolToCV(data,type,jsonType){
    let element_types = document.getElementById(type);
    let title = document.createElement("p");
    title.innerHTML = data[jsonType].name;
    element_types.appendChild(title);
    data[jsonType].schools.forEach(element => {
        let content = document.createElement("div");
        let name = document.createElement("p");
        name.innerHTML = element.name;
        let date = document.createElement("p");
        date.innerHTML = element.date;
        content.append(name,date);
        element_types.append(content);
    });
}

function simpleListWithLinkToCV(data,type,jsonType){
    let element_types = document.getElementById(type);
    let title = document.createElement("p");
    title.innerHTML = data[jsonType].name;
    title.style.alignContent = "left";
    element_types.parentElement.insertBefore(title,element_types);
    data[jsonType][jsonType].forEach(item => {
        let ul_element = document.createElement("li");
        let ulr_element = document.createElement("a");
        ulr_element.href = item.link;
        ulr_element.innerText = item.name;
        ul_element.appendChild(ulr_element);
        element_types.appendChild(ul_element);
    })
}

function createContactElement(element_parent,picture_url,element){
    let main_div = document.createElement("div");
    let img_holder = document.createElement("div");
    let text_holder = document.createElement("div");
    main_div.append(img_holder,text_holder);
    let img = document.createElement("object");
    img.setAttribute("class","svg-image");
    img.setAttribute("type","image/svg+xml");
    img.setAttribute("data",picture_url);
    img.style.transform = "scale(0.65)";
    img_holder.append(img);
    let p = document.createElement("p");
    p.innerHTML = element;
    text_holder.append(p);
    element_parent.append(main_div);
}

function createContactElementWithLink(element_parent,picture_url,element){
    let main_div = document.createElement("div");
    let img_holder = document.createElement("div");
    let text_holder = document.createElement("div");
    main_div.append(img_holder,text_holder);
    let img = document.createElement("object");
    img.setAttribute("class","svg-image");
    img.setAttribute("type","image/svg+xml");
    img.setAttribute("data",picture_url);
    img.style.transform = "scale(0.65)";
    img_holder.append(img);
    let a = document.createElement("a");
    a.innerHTML = element.title;
    a.setAttribute("href",element.link);
    text_holder.append(a);
    element_parent.append(main_div);
}

function contactToCV(data,type,jsonType){
    let element_parent = document.getElementById(type);
    let p = document.createElement("p");
    p.innerHTML = data[jsonType].name;
    element_parent.append(p);
    data[jsonType].address.forEach(element => {
        createContactElement(element_parent,"static/img/home.svg",element);
    });
    createContactElementWithLink(element_parent,"static/img/email.svg",data[jsonType].email);
    createContactElement(element_parent,"static/img/phone.svg",data[jsonType].phone);
    createContactElementWithLink(element_parent,"static/img/linkedin.svg",data[jsonType].linkedin);
    createContactElementWithLink(element_parent,"static/img/github.svg",data[jsonType].github);
}

function dataToCV(data){
    nameToCV(data);
    contactToCV(data,"cv_viewer_contact","contact");
    simpleListToCV(data,"t_skills","technical_skills");
    simpleListToCV(data,"s_skills","soft_skills");
    simpleListToCV(data, "hobbies","hobbies");
    simpleListToCV(data, "languages","languages");
    introductionToCV(data,"cv_viewer_introduction","introduction");
    expOrprojectToCV(data,"cv_viewer_experiences","experiences");
    expOrprojectToCV(data,"cv_viewer_projects","projects");
    schoolToCV(data,"cv_viewer_schools","education");
    simpleListWithLinkToCV(data,"certifications","certifications");
}

jsonfile.addEventListener("change", event => {
    var reader = new FileReader();
    reader.onload = function() {
        dataToCV(JSON.parse(reader.result));
    };
    reader.readAsText(event.target.files[0]);
});
