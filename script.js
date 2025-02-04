// DOM Elements
const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const mainContent = document.getElementById('mainContent');

// User data (In a real application, this would come from a backend)
const users = {
    admin: { username: 'admin', password: 'admin123' },
    member: { username: 'member', password: 'member123' },
    user: { username: 'user', password: 'user123' }
};

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const username = event.target.querySelector('input[type="text"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    const role = document.getElementById('userRole').value;

    // Simple authentication (In a real application, this would be handled by a backend)
    if (users[role].username === username && users[role].password === password) {
        loginForm.classList.add('hidden');
        dashboard.classList.remove('hidden');
        document.querySelector('.sidebar').style.display = 'flex';
        loadDashboard(role);
    } else {
        alert('Invalid credentials!');
    }
    return false;
}

// Load dashboard based on user role
function loadDashboard(role) {
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => {
        if (role === 'admin') {
            link.style.display = 'block';
        } else {
            // Hide certain navigation items for non-admin users
            const linkText = link.querySelector('span').textContent.toLowerCase();
            if (['members', 'packages', 'reports'].includes(linkText)) {
                link.style.display = 'none';
            }
        }
    });
}

// Navigation functions
function showDashboard() {
    hideAllSections();
    dashboard.classList.remove('hidden');
}

function showMembers() {
    hideAllSections();
    // Implementation for members section
}

function showBills() {
    hideAllSections();
    // Implementation for bills section
}

function showPackages() {
    hideAllSections();
    // Implementation for packages section
}

function showSupplements() {
    hideAllSections();
    // Implementation for supplements section
}

function showDiet() {
    hideAllSections();
    // Implementation for diet plans section
}

function showReports() {
    hideAllSections();
    // Implementation for reports section
}

// Helper function to hide all sections
function hideAllSections() {
    const sections = mainContent.children;
    for (let section of sections) {
        section.classList.add('hidden');
    }
}

// Logout function
function logout() {
    location.reload();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Hide sidebar initially
    document.querySelector('.sidebar').style.display = 'none';
    
    // Show login form
    loginForm.classList.remove('hidden');
    dashboard.classList.add('hidden');
});

// Notification system
class NotificationSystem {
    constructor() {
        this.notifications = [];
    }

    addNotification(title, message, type = 'info') {
        const notification = {
            id: Date.now(),
            title,
            message,
            type,
            timestamp: new Date()
        };
        this.notifications.push(notification);
        this.updateNotificationBadge();
        return notification;
    }

    removeNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.updateNotificationBadge();
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notifications .badge');
        if (badge) {
            badge.textContent = this.notifications.length;
        }
    }
}

// Initialize notification system
const notificationSystem = new NotificationSystem();

// Example notification (remove in production)
notificationSystem.addNotification(
    'Welcome',
    'Welcome to the Gym Management System',
    'info'
);
