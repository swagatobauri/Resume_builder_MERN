const puppeteer = require('puppeteer');

// Helper to generate HTML for the resume
const generateResumeHTML = (resumeData, layoutType) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

    // Common styles (Tailwind CDN for simplicity in this context, or inline styles)
    // We'll use a simple HTML structure with inline styles/Tailwind classes that mirror the frontend
    // Note: For production, bundling CSS or reading the CSS file is better, but CDN works for Puppeteer if internet is available.
    // Alternatively, we can inject the CSS string directly.

    // For this implementation, I'll use a combination of inline styles and a Tailwind CDN for layout.

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @page {
                size: A4;
                margin: 0;
            }
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        </style>
    </head>
    <body class="bg-white">
        ${getLayoutHTML(layoutType, resumeData)}
    </body>
    </html>
    `;

    return htmlContent;
};

const getLayoutHTML = (layoutType, data) => {
    switch (layoutType) {
        case 'modern':
            return getModernLayout(data);
        case 'classic':
            return getClassicLayout(data);
        case 'minimal':
            return getMinimalLayout(data);
        case 'creative':
            return getCreativeLayout(data);
        default:
            return getModernLayout(data);
    }
};

// --- Layout Templates (Mirroring Frontend Components) ---

const getModernLayout = (data) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

    return `
        <div class="w-full max-w-[210mm] mx-auto min-h-[297mm] bg-white">
            <!-- Header -->
            <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8">
                <h1 class="text-4xl font-bold mb-2">${personalInfo.fullName || 'Your Name'}</h1>
                <div class="flex flex-wrap gap-4 text-sm">
                    ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
                    ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
                    ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
                </div>
                <div class="flex flex-wrap gap-4 text-sm mt-2">
                    ${personalInfo.portfolio ? `<span>🌐 ${personalInfo.portfolio}</span>` : ''}
                    ${personalInfo.linkedin ? `<span>💼 LinkedIn</span>` : ''}
                    ${personalInfo.github ? `<span>💻 GitHub</span>` : ''}
                </div>
            </div>

            <div class="flex">
                <!-- Left Sidebar -->
                <div class="w-1/3 bg-gray-50 p-6 min-h-[250mm]">
                    <!-- Skills -->
                    ${(skills.technical.length > 0 || skills.soft.length > 0) ? `
                        <div class="mb-6">
                            <h2 class="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">SKILLS</h2>
                            ${skills.technical.length > 0 ? `
                                <div class="mb-4">
                                    <h3 class="font-semibold text-gray-700 mb-2">Technical</h3>
                                    <div class="flex flex-wrap gap-2">
                                        ${skills.technical.map(skill => `<span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">${skill}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${skills.soft.length > 0 ? `
                                <div>
                                    <h3 class="font-semibold text-gray-700 mb-2">Soft Skills</h3>
                                    <div class="flex flex-wrap gap-2">
                                        ${skills.soft.map(skill => `<span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">${skill}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}

                    <!-- Certifications -->
                    ${(certifications && certifications.length > 0) ? `
                        <div>
                            <h2 class="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">CERTIFICATIONS</h2>
                            ${certifications.map(cert => `
                                <div class="mb-3">
                                    <p class="font-semibold text-gray-800">${cert.name}</p>
                                    <p class="text-sm text-gray-600">${cert.issuer}</p>
                                    <p class="text-xs text-gray-500">${cert.date}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>

                <!-- Right Content -->
                <div class="w-2/3 p-6">
                    <!-- Summary -->
                    ${summary ? `
                        <div class="mb-6">
                            <h2 class="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">PROFESSIONAL SUMMARY</h2>
                            <p class="text-gray-700 leading-relaxed text-sm">${summary}</p>
                        </div>
                    ` : ''}

                    <!-- Experience -->
                    ${(experience && experience.length > 0) ? `
                        <div class="mb-6">
                            <h2 class="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">WORK EXPERIENCE</h2>
                            ${experience.map(exp => `
                                <div class="mb-4">
                                    <h3 class="text-lg font-bold text-gray-800">${exp.position}</h3>
                                    <p class="text-indigo-600 font-semibold text-sm">${exp.company} | ${exp.duration}</p>
                                    <p class="text-gray-700 mt-2 text-sm">${exp.description}</p>
                                    ${exp.technologies ? `<p class="text-sm text-gray-600 mt-1"><span class="font-semibold">Technologies:</span> ${exp.technologies}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- Education -->
                    ${(education && education.length > 0) ? `
                        <div class="mb-6">
                            <h2 class="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">EDUCATION</h2>
                            ${education.map(edu => `
                                <div class="mb-3">
                                    <h3 class="text-lg font-bold text-gray-800">${edu.degree} in ${edu.field}</h3>
                                    <p class="text-indigo-600 font-semibold text-sm">${edu.institution} | ${edu.graduationYear}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- Projects -->
                    ${(projects && projects.length > 0) ? `
                        <div>
                            <h2 class="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">PROJECTS</h2>
                            ${projects.map(proj => `
                                <div class="mb-4">
                                    <h3 class="text-lg font-bold text-gray-800">${proj.name}</h3>
                                    <p class="text-gray-700 mt-1 text-sm">${proj.description}</p>
                                    ${proj.technologies ? `<p class="text-sm text-gray-600 mt-1"><span class="font-semibold">Technologies:</span> ${proj.technologies}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

const getClassicLayout = (data) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;
    return `
        <div class="w-full max-w-[210mm] mx-auto p-12 bg-white text-gray-900 font-serif">
            <div class="text-center border-b-2 border-gray-800 pb-6 mb-8">
                <h1 class="text-4xl font-bold mb-2 uppercase tracking-wider">${personalInfo.fullName || 'Your Name'}</h1>
                <div class="text-sm space-x-3 text-gray-600">
                    ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
                    ${personalInfo.phone ? `<span>• ${personalInfo.phone}</span>` : ''}
                    ${personalInfo.location ? `<span>• ${personalInfo.location}</span>` : ''}
                </div>
                <div class="text-sm space-x-3 text-gray-600 mt-1">
                     ${personalInfo.linkedin ? `<span>${personalInfo.linkedin}</span>` : ''}
                     ${personalInfo.portfolio ? `<span>• ${personalInfo.portfolio}</span>` : ''}
                </div>
            </div>

            ${summary ? `
                <div class="mb-6">
                    <h2 class="text-lg font-bold uppercase border-b border-gray-400 mb-3">Professional Summary</h2>
                    <p class="text-sm leading-relaxed">${summary}</p>
                </div>
            ` : ''}

            ${(experience && experience.length > 0) ? `
                <div class="mb-6">
                    <h2 class="text-lg font-bold uppercase border-b border-gray-400 mb-3">Experience</h2>
                    ${experience.map(exp => `
                        <div class="mb-4">
                            <div class="flex justify-between items-baseline">
                                <h3 class="font-bold text-md">${exp.position}</h3>
                                <span class="text-sm italic">${exp.duration}</span>
                            </div>
                            <div class="text-sm font-semibold mb-1">${exp.company}</div>
                            <p class="text-sm">${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${(education && education.length > 0) ? `
                <div class="mb-6">
                    <h2 class="text-lg font-bold uppercase border-b border-gray-400 mb-3">Education</h2>
                    ${education.map(edu => `
                        <div class="mb-2">
                            <div class="flex justify-between">
                                <span class="font-bold">${edu.institution}</span>
                                <span class="text-sm">${edu.graduationYear}</span>
                            </div>
                            <div class="text-sm">${edu.degree} in ${edu.field}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

             ${(skills.technical.length > 0) ? `
                <div class="mb-6">
                    <h2 class="text-lg font-bold uppercase border-b border-gray-400 mb-3">Skills</h2>
                    <p class="text-sm">${skills.technical.join(', ')}</p>
                </div>
            ` : ''}
        </div>
    `;
};

const getMinimalLayout = (data) => {
    // Placeholder for Minimal - using Modern for now or a simple variant
    // For brevity, I'll map it to a simplified version of Modern or just duplicate for now
    // Ideally, implement the actual Minimal HTML structure here
    return getModernLayout(data);
};

const getCreativeLayout = (data) => {
    // Placeholder for Creative
    return getModernLayout(data);
};


// --- Main PDF Generation Function ---

const generateResumePDF = async (resumeData, layoutType = 'modern') => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-extensions'
            ]
        });
        const page = await browser.newPage();

        const html = generateResumeHTML(resumeData, layoutType);

        // Set content with a simpler wait condition first, then maybe wait for network
        // 'networkidle0' can be flaky if there are persistent connections or long loading resources
        // Using 'domcontentloaded' is safer for simple HTML generation
        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        // Give a small buffer for Tailwind CDN to apply if needed, though networkidle0 is better if it works
        // Let's try a small timeout instead of strict network idle if it fails
        // Or just rely on the fact that we are injecting HTML.
        // For CDN, we DO need to wait for it to load.

        try {
            await page.waitForNetworkIdle({ timeout: 5000 });
        } catch (e) {
            console.warn('Network idle timeout, proceeding anyway');
        }

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        });

        await browser.close();
        return pdfBuffer;

    } catch (error) {
        console.error('Puppeteer PDF generation error:', error);
        throw error;
    }
};

module.exports = {
    generateResumePDF
};

