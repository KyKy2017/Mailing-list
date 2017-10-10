var mastercheckbox, topic1, topic2, topic3, topic4, topic5;
var URL = "http://launchspacechallenge3.azurewebsites.net/api/getUsers";

window.onload = function() { //slove the sequencing issue
    mastercheckbox = document.getElementById("MasterCheckbox");
    topic1 = document.getElementById("topic1");
    topic2 = document.getElementById("topic2");
    topic3 = document.getElementById("topic3");
    topic4 = document.getElementById("topic4");
    topic5 = document.getElementById("topic5");
}

function toggleAllCheckboxes() { //select all function #1
    topic1.checked = mastercheckbox.checked;
    topic2.checked = mastercheckbox.checked;
    topic3.checked = mastercheckbox.checked;
    topic4.checked = mastercheckbox.checked;
    topic5.checked = mastercheckbox.checked;
}

function updateMasterCheckbox() { //select all function #2
    if (topic1.checked && topic2.checked && topic3.checked && topic4.checked && topic5.checked) {
        mastercheckbox.checked = true;
    } else {
        mastercheckbox.checked = false;
    }
}

function showResults(e) { //showing result in the result page
    if (e.preventDefault) e.preventDefault()

    if (topic1.checked) {
        document.getElementById("subscribedForTopic1").innerHTML = "Mailing lists of " + topic1.value;
        //add subscribed emails results here
    } else {
        document.getElementById("subscribedForTopic1").innerHTML = "";
    }
    if (topic2.checked) {
        document.getElementById("subscribedForTopic2").innerHTML = "Mailing lists of " + topic2.value;
        //add subscribed emails results here
    } else {
        document.getElementById("subscribedForTopic2").innerHTML = "";
    }
    if (topic3.checked) {
        document.getElementById("subscribedForTopic3").innerHTML = "Mailing lists of " + topic3.value;
        //add subscribed emails results here
    } else {
        document.getElementById("subscribedForTopic3").innerHTML = "";
    }
    if (topic4.checked) {
        document.getElementById("subscribedForTopic4").innerHTML = "Mailing lists of " + topic4.value;
        //add subscribed emails results here
    } else {
        document.getElementById("subscribedForTopic4").innerHTML = "";
    }
    if (topic5.checked) {
        document.getElementById("subscribedForTopic5").innerHTML = "Mailing lists of " + topic5.value;
        //add subscribed emails results here
    } else {
        document.getElementById("subscribedForTopic5").innerHTML = "";
    }

    if (!topic1.checked && !topic2.checked && !topic3.checked && !topic4.checked && !topic5.checked) {
        document.getElementById("notSelected").innerHTML = "Please select the topic(s) you would like to view!"
    } else {
        document.getElementById("notSelected").innerHTML = "";
    }
}

var form = document.getElementById('myform');

// if (form.attachEvent) {
//     form.attachEvent("submit", showResults);
// } else {
//     form.addEventListener("submit", showResults);
// }


//functions based on jason's sample code

function postRecord() { //post to database. DONE!
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = this.responseText;
        }
    };

    //response to user after press button
    if (email == null) {
        document.getElementById("result1").innerHTML = "Please enter your email address!";
    }

    if (!(topic1.checked || topic2.checked || topic3.checked || topic4.checked || topic5.checked)) {
        document.getElementById("result1").innerHTML = "Please select a topic!";
    } else {
        document.getElementById("result1").innerHTML = "Thank you " + name + ", your subscription is successful!";
    }

    xhttp.open("POST", URL + "?username=" + name + "&useremail=" + email + "&topic1=" + topic1.checked + "&topic2=" + topic2.checked +
        "&topic3=" + topic3.checked + "&topic4=" + topic4.checked + "&topic5=" + topic5.checked, true);

    xhttp.send();
}

function getRecord() { //get data from database. NEED to UPDATE!!!
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (var i = 0; i < response.length; i++) {
                document.getElementById("result").innerHTML += response[i].name + "<br> ";
            }
        }
    };
    xhttp.open("GET", URL, true);
    xhttp.send();
}