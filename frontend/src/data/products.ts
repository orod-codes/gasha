import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'gasha-antivirus',
    name: 'GASHA Anti-Virus',
    category: 'gasha',
    module: 'gasha',
    description: 'Gasha Antivirus gives you powerful protection against viruses, malware, ransomware, and online threats – all while staying light on your system. With a smart scanning engine and real-time monitoring, Gasha works quietly in the background so you can browse, work, and play without worry.',
    features: [
      'Powerful Protection - Stops viruses, ransomware, spyware, and other threats before they can harm your files',
      'Fast & Lightweight - Optimized scanning runs smoothly in the background without slowing your PC',
      'Real-Time Security - Always-on monitoring blocks unsafe apps, downloads, and suspicious activity',
      'Easy & Hassle-Free - Automatic updates, safe quarantine, and fewer false alarms keep you protected with no extra effort'
    ],
    hasDownload: true,
    hasRequest: true,
    hasShowProducts: false
  },
  {
    id: 'gasha-waf',
    name: 'GASHA WAF',
    category: 'gasha',
    module: 'gasha',
    description: 'Protect your applications against a wide range of threats, including the OWASP Top 10 attacks, malicious file uploads with intelligent antivirus scanning, and sophisticated cyberattacks.',
    features: [
      'Scalable and Flexible - Gasha WAF is designed to meet the needs of businesses of all sizes. Whether you run a small e-commerce platform or a large enterprise, it integrates seamlessly with existing architecture and can be easily customized to match your specific security goals and operational requirements',
      'Comprehensive Reporting and Compliance - Gain actionable insights into your security posture through detailed reports and compliance-ready dashboards. Gasha WAF helps you identify emerging threats, make informed decisions, and meet regulatory requirements with minimal effort',
      'Robust Protection - Protect your applications against a wide range of threats, including the OWASP Top 10 attacks, malicious file uploads with intelligent antivirus scanning, and sophisticated cyberattacks. Gasha WAF leverages real-time threat intelligence (CTI) and AI-driven analytics to stay ahead of evolving threats'
    ],
    hasDownload: false,
    hasRequest: true,
    hasShowProducts: false
  },
  {
    id: 'gasha-vpn',
    name: 'GASHA VPN',
    category: 'gasha',
    module: 'gasha',
    description: 'Powered by advanced artificial intelligence and behavioral analysis, Gasha VPN provides secure and private internet access with intelligent threat detection.',
    features: [
      'Intelligent Threat Detection - Powered by advanced artificial intelligence and behavioral analysis, Gasha VPN proactively detects and mitigates evolving cyber threats in real-time. It continuously learns from traffic patterns, adapts its defense mechanisms, and blocks sophisticated attacks automatically',
      'Scalable and Flexible - Gasha VPN is designed to meet the needs of businesses of all sizes. Whether you run a small e-commerce platform or a large enterprise, it integrates seamlessly with existing architecture',
      'Comprehensive Reporting and Compliance - Gain actionable insights into your security posture through detailed reports and compliance-ready dashboards',
      'Real-time threat intelligence and automatic adaptation'
    ],
    hasDownload: true,
    hasRequest: true,
    hasShowProducts: false
  },
  {
    id: 'nisir-siem',
    name: 'NISIR SIEM',
    category: 'nisir',
    module: 'nisir',
    description: 'An advanced Security Information and Event Management (SIEM) solution that empowers organizations to detect, analyze, and respond to threats in real time. With centralized log management, AI-driven analytics, and comprehensive reporting, it provides unparalleled visibility into your network, ensuring proactive defense and regulatory compliance.',
    features: [
      'Centralized Log Management - Consolidates log data from various sources into a single platform for better monitoring and analysis',
      'Unified SOC Reporting - Boost your SOC team\'s efficiency with unified reporting across the entire organization. NISIR enables seamless and comprehensive security operations reporting',
      'Enhanced SIEM Capabilities - NISIR integrates advanced solutions such as File Integrity Monitoring (FIM), Vulnerability Management, and Threat Intelligence, fortifying your SIEM to deliver a stronger defense against cyber threats',
      'Regulatory Compliance Integration - NISIR supports regulatory compliance by integrating essential frameworks, helping your organization meet and maintain industry standards such as GDPR, HIPAA, and more'
    ],
    hasDownload: false,
    hasRequest: true,
    hasShowProducts: false
  },
  {
    id: 'enyuma-iam',
    name: 'ENYUMA IAM',
    category: 'enyuma',
    module: 'enyuma',
    description: 'Identity and Access Management (IAM) software ensures the right people have access to the right resources at the right times.',
    features: [
      'Single Sign-On (SSO) - Users log in once for access to multiple systems',
      'Identity Lifecycle Management - Manages user identities from creation to removal',
      'Access Control Policies - Defines and enforces access rules based on roles and sensitivity',
      'Multi-Factor Authentication - Requires multiple forms of authentication for added security'
    ],
    hasDownload: false,
    hasRequest: false,
    hasShowProducts: true
  },
  {
    id: 'codepro-protection',
    name: 'CODEPRO Protection',
    category: 'codepro',
    module: 'codepro',
    description: 'Codepro is a versatile code protection system that obfuscates and protects an executable file and source code of a program to make it difficult or impossible for humans to understand, all without impacting the program\'s functionality.',
    features: [
      'Multi-Language Code Protection - Unified system offering strong protection for C/C++, .NET, Java, and Python code against reverse engineering and tampering',
      'Source and Binary-Level Security - Secure both source code and binaries to prevent unauthorized access and ensure complete software integrity',
      'Customizable Obfuscation Techniques - Choose from flexible obfuscation options to enhance code security and optimize performance',
      'Flexible Engagement Plans - Select from plans designed for all project scales, offering both basic and advanced security solutions'
    ],
    hasDownload: false,
    hasRequest: false,
    hasShowProducts: true
  },
  {
    id: 'biometrics',
    name: 'Biometrics ABIS',
    category: 'biometrics',
    module: 'biometrics',
    description: 'ABIS (Automated Biometric Identification System) is a technology that automates the identification of individuals based on their unique biological characteristics such as Fingerprint, Face, Iris and Voice.',
    features: [
      'Enrollment - Capture biometric data using hardware such as fingerprint scanners or facial recognition cameras to ensure accurate collection of biometric samples',
      'Verification - A way to identify individuals based on their unique characteristics or body measurements',
      'Adjudication - The adjudication procedure resolves complex and anomalous matching cases by using automatic rulesets or forwarding the cases to human operators',
      'Deduplication - Once registered, the system compares the person\'s biometric data with existing records to determine whether the identity is unique or not'
    ],
    hasDownload: false,
    hasRequest: true,
    hasShowProducts: false
  }
];