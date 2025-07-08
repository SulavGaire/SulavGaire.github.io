document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from data.json
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Populate Profile Name
            document.getElementById('profile-name').textContent = data.name;

            // Initialize Email Scramble
            window.emailScramble = new scrambledString(document.getElementById('email'),
                'emailScramble', data.academicEmailScrambled,
                [23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
            window.emailScramble2 = new scrambledString(document.getElementById('email2'),
                'emailScramble2', data.personalEmailScrambled,
                [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

            // Populate About Section
            document.getElementById('about-paragraph-1').innerHTML = data.about.paragraph1;
            document.getElementById('about-paragraph-2').innerHTML = data.about.paragraph2;
            document.getElementById('about-paragraph-3').innerHTML = data.about.paragraph3;
            document.getElementById('research-interests').textContent = data.about.researchInterests;

            // Populate Top Contact Links
            const contactLinksContainer = document.getElementById('contact-links');
            data.contactLinks.forEach((link, index) => {
                if (index > 0) {
                    const span = document.createElement('span');
                    span.innerHTML = '  |  ';
                    contactLinksContainer.appendChild(span);
                }
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.text;
                a.target = '_blank';
                contactLinksContainer.appendChild(a);
            });

            // Populate Bottom Contact Links
            const bottomContactLinksContainer = document.getElementById('bottom-contact-links');
            data.contactLinks.forEach((link, index) => {
                if (index > 0) {
                    const span = document.createElement('span');
                    span.innerHTML = '  ~  ';
                    bottomContactLinksContainer.appendChild(span);
                }
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.text;
                a.target = '_blank';
                bottomContactLinksContainer.appendChild(a);
            });

            // Populate Education Section
            const educationTable = document.getElementById('education-table');
            data.education.forEach(edu => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding:10px;width:25%;vertical-align:middle">
                        <div class="one">
                            <img src='${edu.logo}' width="150" class="side-image">
                        </div>
                    </td>
                    <td style="padding:10px;width:75%;vertical-align:top">
                        <papertitle style="color:gray"><big>${edu.degreeType}</big> </papertitle>
                        <papertitle><big>${edu.degreeName}</big></papertitle>
                        <br>
                        <papertitle><big>${edu.institution}</big></papertitle>
                        <br>
                        ${edu.date}
                        <br>
                        <br>
                        <p>
                            Positions of Responsibility:
                        <ul>
                            ${edu.responsibilities.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        </p>
                    </td>
                `;
                educationTable.appendChild(row);
            });

            // Populate Experience Section
            const experienceTable = document.getElementById('experience-table');
            data.experience.forEach(exp => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding:10px;width:25%;vertical-align:middle">
                        <div class="one">
                            <img src='${exp.logo}' width="150" class="side-image">
                        </div>
                    </td>
                    <td style="padding:10px;width:75%;vertical-align:top">
                        <papertitle style="color:gray"><big>${exp.type}</big> </papertitle>
                        <papertitle><big>${exp.company}</big></papertitle>
                        <br>
                        ${exp.location ? `<strong>${exp.location}</strong><br>` : ''}
                        <em>${exp.duration}</em><br>
                        ${exp.website ? `<a href="${exp.website}" target="_blank">[website]</a><br>` : ''}
                        <br>
                        <p>
                            ${exp.advisor ? `Advisor: ${exp.advisor}<br>` : ''}
                            ${exp.team ? `Team: ${exp.team}<br>` : ''}
                        <ul>
                            ${exp.description.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        </p>
                    </td>
                `;
                experienceTable.appendChild(row);
            });

            // Populate Projects Section
            const projectsTable = document.getElementById('projects-table');
            data.projects.forEach(project => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding:20px;width:25%;vertical-align:middle">
                        <div class="one">
                            <img src='${project.image}' width="150">
                        </div>
                    </td>
                    <td style="padding:20px;width:75%;vertical-align:top">
                        <papertitle><big>${project.title}</papertitle></big>
                        <br>
                        <p>
                            ${project.codeLink ? `<em><a href="${project.codeLink}" target="_blank">[code]</a></em>` : ''}
                            ${project.reportLink ? ` <em><a href="${project.reportLink}" target="_blank">[report]</a></em>` : ''}
                            ${project.paperLink ? ` <em><a href="${project.paperLink}" target="_blank">[paper]</a></em>` : ''}
                            ${project.websiteLink ? `<em><a href="${project.websiteLink}" target="_blank">[website]</a></em>` : ''}
                            ${project.videoLink ? `<em><a href="${project.videoLink}" target="_blank">[video]</a></em>` : ''}
                            ${project.myContributionLink ? `<em><a href="${project.myContributionLink}" target="_blank">[my contribution]</a></em>` : ''}
                            ${project.certificateLink ? `<em><a href="${project.certificateLink}" target="_blank">[certificate]</a></em>` : ''}
                        </p>
                        <p>
                            ${project.type ? `${project.type} <br>` : ''}
                            ${project.supervisor ? `<strong>Supervisor: ${project.supervisor}</strong><br>` : ''}
                            ${project.company ? `${project.company}<br>` : ''}
                            ${project.awards ? `<strong>${project.awards}</strong> <br>` : ''}
                        <ul>
                            ${project.description.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        </p>
                    </td>
                `;
                projectsTable.appendChild(row);
            });

            // Populate Honors and Awards Section
            const honorsAwardsTable = document.getElementById('honors-awards-table');
            data.honorsAndAwards.forEach(award => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding:5px;width:100%;vertical-align:middle">
                        <div class="project-container">
                            <papertitle>${award.title}</papertitle>
                            ${award.link ? `<a href="${award.link}" target="_blank" rel="noopener noreferrer">[link]</a>` : ''}
                        </div>
                        <p>
                            ${award.company ? `${award.company}<br>` : ''}
                            ${award.date ? `<em>${award.date}</em><br>` : ''}
                        </p>
                        ${award.description ? `<ul>${award.description.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
                    </td>
                `;
                honorsAwardsTable.appendChild(row);
            });

            // Populate Publications Section
            const publicationsTable = document.getElementById('publications-table');
            // Clear the initial "No publications yet" message
            publicationsTable.innerHTML = ''; 

            if (data.papers && data.papers.length > 0) {
                data.papers.forEach(paper => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td style="padding:5px;width:100%;vertical-align:middle">
                            ${paper.image ? `<div class="one-paper"><img src='${paper.image}' width="150" class="side-image-paper"></div>` : ''}
                            <div class="paper-details">
                                <papertitle><big>${paper.title}</big> ${paper.type ? `(${paper.type})` : ''}</papertitle>
                                <br>
                                ${paper.authors ? `<em>${paper.authors}</em><br>` : ''}
                                ${paper.journalOrConference ? `${paper.journalOrConference}, ${paper.year}<br>` : ''}
                                ${paper.abstract ? `<p>${paper.abstract}</p>` : ''}
                                ${paper.link ? `<a href="${paper.link}" target="_blank" rel="noopener noreferrer">[Paper Link]</a>` : ''}
                            </div>
                        </td>
                    `;
                    publicationsTable.appendChild(row);
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding:5px;width:100%;vertical-align:middle">
                        <p>No publications added yet. Check back later!</p>
                    </td>
                `;
                publicationsTable.appendChild(row);
            }

            // Populate Certifications Section
            const certificationsTable = document.getElementById('certifications-table');
            data.certifications.forEach(cert => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding:5px;width:100%;vertical-align:middle">
                        <div class="project-container">
                            <a href="${cert.link}" target="_blank" rel="noopener noreferrer">
                                <papertitle>${cert.title}</papertitle>
                            </a>
                            <papertitle style="color: gray;">${cert.company}</papertitle>
                        </div>
                        ${cert.description ? `<ul>${cert.description.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
                    </td>
                `;
                certificationsTable.appendChild(row);
            });

        })
        .catch(error => {
            console.error('Error loading data.json:', error);
        });
});