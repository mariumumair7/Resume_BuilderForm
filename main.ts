import { JSDOM } from 'jsdom';

// Create a simulated DOM environment
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <form id="resume-form">
                <input type="text" id="first-name" placeholder="First Name" />
                <input type="text" id="last-name" placeholder="Last Name" />
                <input type="email" id="email" placeholder="Email" />
                <input type="tel" id="mobile" placeholder="Mobile" />
                <input type="text" id="address" placeholder="Address" />
                <select id="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input type="checkbox" id="web-development" /> Web Development
                <input type="checkbox" id="graphic-design" /> Graphic Design
                <input type="checkbox" id="seo" /> SEO
                <button type="submit">Generate Resume</button>
            </form>
            <div id="resume-output" style="display: none;">
                <div id="resume-content"></div>
            </div>
        </body>
    </html>
`);

// Access the simulated DOM's document object
const document = dom.window.document;

// The logic to generate the resume
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
    const resumeContent = document.getElementById('resume-content') as HTMLDivElement;

    if (!form || !resumeOutput || !resumeContent) {
        console.error("Form or resume elements are not found in the DOM.");
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        console.log("Form submission detected");

        // Fetch form data
        const firstName = (document.getElementById('first-name') as HTMLInputElement).value;
        const lastName = (document.getElementById('last-name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const mobile = (document.getElementById('mobile') as HTMLInputElement).value;
        const address = (document.getElementById('address') as HTMLInputElement).value;
        const gender = (document.getElementById('gender') as HTMLSelectElement).value;

        console.log("Captured Data: ", { firstName, lastName, email, mobile, address, gender });

        // Skills
        const skills: string[] = [];
        if ((document.getElementById('web-development') as HTMLInputElement).checked) skills.push('Web Development');
        if ((document.getElementById('graphic-design') as HTMLInputElement).checked) skills.push('Graphic Design');
        if ((document.getElementById('seo') as HTMLInputElement).checked) skills.push('SEO');

        // Generate resume content
        let resumeHtml = `<p><strong>Name:</strong> ${firstName} ${lastName}</p>`;
        resumeHtml += `<p><strong>Email:</strong> ${email}</p>`;
        resumeHtml += `<p><strong>Mobile:</strong> ${mobile}</p>`;
        resumeHtml += `<p><strong>Address:</strong> ${address}</p>`;
        resumeHtml += `<p><strong>Gender:</strong> ${gender}</p>`;

        if (skills.length > 0) {
            resumeHtml += `<p><strong>Skills:</strong> ${skills.join(', ')}</p>`;
        }

        console.log("Generated Resume HTML: ", resumeHtml);

        // Display resume
        resumeContent.innerHTML = resumeHtml;
        resumeOutput.style.display = 'block';  // Ensure the resume-output is visible
    });
});

// Simulate the "DOMContentLoaded" event since JSDOM doesn't automatically trigger it.
dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));

// Simulate form submission (for testing purposes)
const formElement = dom.window.document.getElementById('resume-form') as HTMLFormElement;
if (formElement) {
    formElement.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
}
