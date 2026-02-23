import React from 'react'

export default function Resume() {
  return (
    <section className="resume-page">
      <h2 className="page-title">Greg Thomas, CISSP</h2>
      <p className="resume-link">
        <a href="https://github.com/gfsincere" target="_blank" rel="noopener noreferrer">
          https://github.com/gfsincere
        </a>
      </p>

      <div className="resume-section">
        <h3>Summary</h3>
        <p>
          Information Security Professional with 10+ years of experience in information
          security engineering and Linux system administration across various industries
          and environments. Skilled in vulnerability management, risk management, network
          security, system administration, penetration testing, and regulatory compliance.
        </p>
      </div>

      <div className="resume-section">
        <h3>Skills</h3>
        <ul className="skills-list">
          <li><strong>Certifications:</strong> Network+, Security+, CCNA, CISSP, CISA, RHCSA, RHCE</li>
          <li><strong>Systems:</strong> Linux (Debian, RHEL, CentOS, SUSE), Windows, AWS, Azure, GCP</li>
          <li><strong>Languages:</strong> Python, Ruby, Bash, Powershell, PHP, CSS, HTML</li>
          <li><strong>Cloud/Web:</strong> Terraform, Ansible, CloudFormation, Docker, Django, React</li>
          <li><strong>Frameworks:</strong> HIPAA/HITRUST, PCI-DSS, Fedramp</li>
        </ul>
      </div>

      <div className="resume-section">
        <h3>Work Experience</h3>

        <div className="experience-item">
          <h4>2023–Present: Human Health, Information Security Officer</h4>
          <ul>
            <li>Spearheaded and executed HIPAA Type 2 assessment, ensuring compliance with healthcare data protection.</li>
            <li>Pioneered the organization's first external penetration test to enhance cyber defenses.</li>
            <li>Developed a comprehensive security and compliance framework from inception.</li>
            <li>Streamlined operations through automation of device deployment processes.</li>
            <li>Oversaw internal IT operations and proactive threat detection.</li>
          </ul>
        </div>

        <div className="experience-item">
          <h4>2022–2023: Lateral Security, Principal Information Security Consultant</h4>
          <ul>
            <li>Conducted security evaluations for New Zealand government agencies, identifying vulnerabilities and recommending solutions.</li>
            <li>Developed and implemented security policies to ensure compliance with industry standards.</li>
            <li>Advised clients on information security best practices, data protection, and access controls.</li>
          </ul>
        </div>

        <div className="experience-item">
          <h4>2019–2022: Jvion, Information Security Director</h4>
          <ul>
            <li>Built and managed an information security program protecting over 30MM+ health records.</li>
            <li>Configured Rapid7 InsightIDR SIEM across AWS and Azure environments.</li>
            <li>Deployed Microsoft Sentinel and Cloud App Security in Azure.</li>
            <li>Led a team through HITRUST certification for 4 years.</li>
            <li>Managed vulnerability and patch management programs.</li>
          </ul>
        </div>

        <div className="experience-item">
          <h4>2016–2019: Actiance Inc., Security Operations Director</h4>
          <ul>
            <li>Developed compliant security programs in line with FFEIC and the Patriot Act.</li>
            <li>Maintained 99.99% uptime of the DR/BCP facility, managing a team of 15 members.</li>
          </ul>
        </div>

        <div className="experience-item">
          <h4>2015–2016: McGladrey LLP/RSM International, Information Security Consultant, Senior Associate</h4>
          <ul>
            <li>Led risk advisory engagements for compliance frameworks such as PCI-DSS, ISO 27001/2, and NIST 800-53.</li>
            <li>Managed large technical security audits of virtual and physical infrastructures.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h3>Education</h3>
        <p><strong>Harper College</strong> — LPN (2011)</p>
        <p><strong>U.S. Marines Intelligence School</strong> — Intelligence Analyst and Interrogation Specialist (2003)</p>
      </div>

      <div className="resume-section">
        <h3>Contributions / Philanthropy</h3>
        <ul>
          <li>Speaker at BSides Chicago (2014) and Defcon (2018) on Hacking Diversity in the tech community.</li>
          <li>Mentor for YearUp, a program teaching IT skills to underserved communities.</li>
        </ul>
      </div>
    </section>
  )
}
