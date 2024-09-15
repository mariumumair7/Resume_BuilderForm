"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
// Create a simulated DOM environment
var dom = new jsdom_1.JSDOM("\n    <!DOCTYPE html>\n    <html>\n        <body>\n            <form id=\"resume-form\">\n                <input type=\"text\" id=\"first-name\" placeholder=\"First Name\" />\n                <input type=\"text\" id=\"last-name\" placeholder=\"Last Name\" />\n                <input type=\"email\" id=\"email\" placeholder=\"Email\" />\n                <input type=\"tel\" id=\"mobile\" placeholder=\"Mobile\" />\n                <input type=\"text\" id=\"address\" placeholder=\"Address\" />\n                <select id=\"gender\">\n                    <option value=\"Male\">Male</option>\n                    <option value=\"Female\">Female</option>\n                </select>\n                <input type=\"checkbox\" id=\"web-development\" /> Web Development\n                <input type=\"checkbox\" id=\"graphic-design\" /> Graphic Design\n                <input type=\"checkbox\" id=\"seo\" /> SEO\n                <button type=\"submit\">Generate Resume</button>\n            </form>\n            <div id=\"resume-output\" style=\"display: none;\">\n                <div id=\"resume-content\"></div>\n            </div>\n        </body>\n    </html>\n");
// Access the simulated DOM's document object
var document = dom.window.document;
// The logic to generate the resume
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeOutput = document.getElementById('resume-output');
    var resumeContent = document.getElementById('resume-content');
    if (!form || !resumeOutput || !resumeContent) {
        console.error("Form or resume elements are not found in the DOM.");
        return;
    }
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("Form submission detected");
        // Fetch form data
        var firstName = document.getElementById('first-name').value;
        var lastName = document.getElementById('last-name').value;
        var email = document.getElementById('email').value;
        var mobile = document.getElementById('mobile').value;
        var address = document.getElementById('address').value;
        var gender = document.getElementById('gender').value;
        console.log("Captured Data: ", { firstName: firstName, lastName: lastName, email: email, mobile: mobile, address: address, gender: gender });
        // Skills
        var skills = [];
        if (document.getElementById('web-development').checked)
            skills.push('Web Development');
        if (document.getElementById('graphic-design').checked)
            skills.push('Graphic Design');
        if (document.getElementById('seo').checked)
            skills.push('SEO');
        // Generate resume content
        var resumeHtml = "<p><strong>Name:</strong> ".concat(firstName, " ").concat(lastName, "</p>");
        resumeHtml += "<p><strong>Email:</strong> ".concat(email, "</p>");
        resumeHtml += "<p><strong>Mobile:</strong> ".concat(mobile, "</p>");
        resumeHtml += "<p><strong>Address:</strong> ".concat(address, "</p>");
        resumeHtml += "<p><strong>Gender:</strong> ".concat(gender, "</p>");
        if (skills.length > 0) {
            resumeHtml += "<p><strong>Skills:</strong> ".concat(skills.join(', '), "</p>");
        }
        console.log("Generated Resume HTML: ", resumeHtml);
        // Display resume
        resumeContent.innerHTML = resumeHtml;
        resumeOutput.style.display = 'block'; // Ensure the resume-output is visible
    });
});
// Simulate the "DOMContentLoaded" event since JSDOM doesn't automatically trigger it.
dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
// Simulate form submission (for testing purposes)
var formElement = dom.window.document.getElementById('resume-form');
if (formElement) {
    formElement.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
}
