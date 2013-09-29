function accionBeta(obj){
    if (tool == 'fill') 
    {
        fill(obj);
    } else
    if (tool == 'rect') 
    {
        accionRect();
    } else 
    if (tool == 'circle') 
    {
        accionCircle();
    } else
    if (tool == 'text') {
        accionText();
    } else
    if (tool == 'line') {
        accionLine();
    }
}
function accionText(){
        var svg = document.getElementById("canvas");
        var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text2.setAttribute("y", document.querySelector("#y").value);
        text2.setAttribute("x", document.querySelector("#x").value);
        var textContent = document.createTextNode(document.querySelector("#textin").value);
        text2.appendChild(textContent);
        svg.appendChild(text2);
}   

function accionCircle(){
        var svg = document.getElementById("canvas");
        var text2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        text2.setAttribute("y", document.querySelector("#y").value);
        text2.setAttribute("x", document.querySelector("#x").value);
        text2.setAttribute("cy", document.querySelector("#y").value);
        text2.setAttribute("cx", document.querySelector("#x").value);
        text2.setAttribute("stroke", document.querySelector("#stroke").value);
        text2.setAttribute("stroke-width", document.querySelector("#stSize").value);
        text2.setAttribute("fill", document.querySelector("#color").value);
        text2.setAttribute("r", document.querySelector("#r").value);
        text2.setAttribute("onmousedown", "fill(this);");
        svg.appendChild(text2);
} 
function prepareExport(){
    var svg = document.getElementById("canvas");
    svgDoc = svg.children;
    var exported = document.querySelector('#canvasWrap').innerHTML;
    var output = document.querySelector(".opt");
    var outputTextarea = document.querySelector(".optText");
    output.style.display = "block";
    outputTextarea.style.display = "none";
    var dlButton = document.querySelector(".dragout");
    dlButton.setAttribute("href" ,"data:image/xml+svg;base64," + window.btoa(exported));
    dlButton.setAttribute("data-downloadurl" ,dlButton.dataset['downloadurl'] + window.btoa(exported));
    dlButton.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('DownloadURL', this.dataset.downloadurl);
  }, false);
}
    
function accionRect(){
        var svg = document.getElementById("canvas");
        var text2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        text2.setAttribute("y", document.querySelector("#y").value);
        text2.setAttribute("x", document.querySelector("#x").value);
        text2.setAttribute("height", document.querySelector("#height").value);
        text2.setAttribute("width", document.querySelector("#width").value);
        text2.setAttribute("fill", document.querySelector("#color").value);
        text2.setAttribute("stroke", document.querySelector("#stroke").value);
        text2.setAttribute("stroke-width", document.querySelector("#stSize").value);
        text2.setAttribute("onmousedown", "fill(this);");
        svg.appendChild(text2);
}
function accionLine(){
        var svg = document.getElementById("canvas");
        var text2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        text2.setAttribute("y1", document.querySelector("#y").value);
        text2.setAttribute("x1", document.querySelector("#x").value);
        text2.setAttribute("y2", document.querySelector("#height").value);
        text2.setAttribute("x2", document.querySelector("#width").value);
        text2.setAttribute("stroke", document.querySelector("#stroke").value);
        text2.setAttribute("stroke-width", document.querySelector("#stSize").value);
        text2.setAttribute("onmousedown", "fill(this);");
        svg.appendChild(text2);
}

function point_it(event){
    pos_x1 = event.offsetX?(event.offsetX):event.pageX-document.getElementById("canvas").offsetLeft;
    pos_y1 = event.offsetY?(event.offsetY):event.pageY-document.getElementById("canvas").offsetTop;
    document.querySelector("#x").value = pos_x1;
    document.querySelector("#y").value = pos_y1;
}
function point_out(event){
    pos_x2 = event.offsetX?(event.offsetX):event.pageX-document.getElementById("canvas").offsetLeft;
    pos_y2 = event.offsetY?(event.offsetY):event.pageY-document.getElementById("canvas").offsetTop;
    if (tool == "rect") {
    if (pos_x2 >= document.querySelector("#x").value) {
        document.querySelector("#width").value = pos_x2 - document.querySelector("#x").value;
        document.querySelector("#height").value = pos_y2 - document.querySelector("#y").value;
    } else {
        return false;
    }
} else if (tool == "circle") {
    document.querySelector("#r").value = pos_y2 - document.querySelector("#y").value;
} else if (tool == "line") {
    document.querySelector("#y").value = pos_y1;
    document.querySelector("#x").value = pos_x1;
    document.querySelector("#height").value = pos_y2;
    document.querySelector("#width").value = pos_x2;
}
}
function fill(obj) {
    if (tool == 'fill') {
    obj.style.fill = document.querySelector('#color').value;
    obj.style.stroke = document.querySelector('#stroke').value;
}
}

function swTool(tooln) {
    tool = tooln;
    if (tool == "text") {
        document.querySelector('#textin').style.display="block";
    } else {
        document.querySelector('#textin').style.display="none";
    }
}

function cvChange() {
    var svg = document.getElementById("canvas");
    svg.style.width = document.querySelector("#cvWidth").value + "px";
    svg.style.height = document.querySelector("#cvHeight").value + "px";
}

//stuff for downloading
var files = document.querySelectorAll('.dragout');
for (var i = 0, file; file = files[i]; ++i) {
  file.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('DownloadURL', this.dataset.downloadurl);
  }, false);
}
