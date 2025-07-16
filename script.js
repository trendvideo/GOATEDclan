// Enhanced Database with localStorage persistence
let users = JSON.parse(localStorage.getItem('goatedClanUsers')) || [
    {
        id: 1,
        username: "player1",
        password: "test123",
        codmName: "CODM_Player1",
        level: 150,
        mpRank: "Master",
        brRank: "Pro",
        isAdmin: false,
        status: "Pending",
        joinDate: new Date(2023, 5, 15).toISOString(),
        notifications: [],
        profilePic: "",
        gender: "male",
        dob: "1990-01-01",
        robotAvatar: ""
    },
    {
        id: 2,
        username: "admin",
        password: "admin123",
        codmName: "DEADSHOT",
        level: 400,
        mpRank: "Legendary",
        brRank: "Legendary",
        isAdmin: true,
        status: "Admin",
        joinDate: new Date(2023, 0, 1).toISOString(),
        notifications: [],
        profilePic: "",
        gender: "male",
        dob: "1985-05-15",
        robotAvatar: ""
    },
    {
        id: 3,
        username: "proplayer",
        password: "codmpro",
        codmName: "SniperKing",
        level: 300,
        mpRank: "Legendary",
        brRank: "Master",
        isAdmin: false,
        status: "Member",
        joinDate: new Date(2023, 3, 22).toISOString(),
        notifications: [],
        profilePic: "",
        gender: "female",
        dob: "1995-10-20",
        robotAvatar: ""
    }
];

let applications = JSON.parse(localStorage.getItem('goatedClanApplications')) || [
    {
        id: 1,
        userId: 1,
        username: "player1",
        codmName: "CODM_Player1",
        level: 150,
        mpRank: "Master",
        brRank: "Pro",
        reason: "I want to join the clan to improve my skills and compete in tournaments. I have experience in ranked MP and regularly play BR with my squad.",
        status: "Pending",
        applyDate: new Date(2023, 5, 16).toISOString(),
        reviewed: false
    }
];

let activityLogs = JSON.parse(localStorage.getItem('goatedClanActivityLogs')) || [
    {
        id: 1,
        type: "login",
        userId: 2,
        username: "admin",
        message: "Admin logged in",
        timestamp: new Date().toISOString()
    },
    {
        id: 2,
        type: "application",
        userId: 1,
        username: "player1",
        message: "New application submitted by player1 (CODM_Player1)",
        timestamp: new Date(2023, 5, 16).toISOString()
    },
    {
        id: 3,
        type: "registration",
        userId: 3,
        username: "proplayer",
        message: "New user registered: proplayer (SniperKing)",
        timestamp: new Date(2023, 3, 22).toISOString()
    },
    {
        id: 4,
        type: "registration",
        userId: 1,
        username: "player1",
        message: "New user registered: player1 (password: test123)",
        timestamp: new Date(2023, 5, 15).toISOString()
    }
];

let notifications = JSON.parse(localStorage.getItem('goatedClanNotifications')) || [
    {
        id: 1,
        userId: 2, // Admin user ID
        type: "new-application",
        title: "New Clan Application",
        message: "player1 has submitted an application to join the clan",
        timestamp: new Date(2023, 5, 16).toISOString(),
        read: false,
        relatedId: 1 // Application ID
    },
    {
        id: 2,
        userId: 1, // player1
        type: "application-status",
        title: "Application Update",
        message: "Your clan application is pending review",
        timestamp: new Date(2023, 5, 16).toISOString(),
        read: false,
        relatedId: 1 // Application ID
    },
    {
        id: 3,
        userId: 2, // Admin
        type: "new-user",
        title: "New User Registration",
        message: "User 'proplayer' (password: codmpro) just registered to THE RaTELs clan website",
        timestamp: new Date(2023, 3, 22).toISOString(),
        read: false,
        relatedId: 3 // User ID
    }
];

// Clan settings data with localStorage persistence
let clanSettings = JSON.parse(localStorage.getItem('goatedClanSettings')) || {
    name: "THE RaTELs",
    tag: "GOAT",
    logo: "",
    banner: "",
    stats: {
        totalMembers: 47,
        legendaryPlayers: 12,
        avgLevel: 287,
        winRate: 72
    },
    activities: [
        {
            icon: "",
            text: "Clan ranked #3 in last week's tournament",
            daysAgo: 2
        },
        {
            icon: "",
            text: "Tournament registration opens tomorrow",
            daysAgo: 4
        },
        {
            icon: "",
            text: "3 new members joined this week",
            daysAgo: 7
        }
    ],
    topMembers: [
        {
            initials: "DS",
            name: "DEADSHOT",
            level: 400,
            mpRank: "Legendary",
            brRank: "Legendary",
            avatar: ""
        },
        {
            initials: "SK",
            name: "SniperKing",
            level: 387,
            mpRank: "Legendary",
            brRank: "Master",
            avatar: ""
        },
        {
            initials: "TG",
            name: "TacticalGamer",
            level: 355,
            mpRank: "Legendary",
            brRank: "Legendary",
            avatar: ""
        }
    ]
};

// Website settings with localStorage persistence
let websiteSettings = JSON.parse(localStorage.getItem('goatedClanWebsiteSettings')) || {
    name: "RaTEL CoDM",
    tagline: "CRYPTO SQUAD ",
    logo: "",
    background: "",
    theme: "default",
    allowRegistration: true
};

let currentUser = null;
let unreadAdminNotifications = 0;
let selectedGender = null;
let profilePictureFile = null;

// Utility Functions
function saveDataToStorage() {
    localStorage.setItem('goatedClanUsers', JSON.stringify(users));
    localStorage.setItem('goatedClanApplications', JSON.stringify(applications));
    localStorage.setItem('goatedClanActivityLogs', JSON.stringify(activityLogs));
    localStorage.setItem('goatedClanNotifications', JSON.stringify(notifications));
    localStorage.setItem('goatedClanSettings', JSON.stringify(clanSettings));
    localStorage.setItem('goatedClanWebsiteSettings', JSON.stringify(websiteSettings));
    
    // Broadcast changes to all open tabs/windows
    localStorage.setItem('goatedClanSettingsUpdated', Date.now().toString());
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function showLoading(message = "Loading...") {
    document.getElementById('loadingOverlay').style.display = 'flex';
    document.getElementById('loadingText').textContent = message;
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

function simulateNetworkDelay(callback, delay = 1000) {
    showLoading();
    setTimeout(() => {
        callback();
        hideLoading();
    }, delay);
}

// UI Functions
function showNotification(type, message, duration = 5000) {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = '';
    switch(type) {
        case 'success': icon = ''; break;
        case 'error': icon = ''; break;
        case 'warning': icon = ''; break;
    }
    
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span>${message}</span>
        <span class="notification-close" onclick="this.parentElement.remove()">�</span>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Trigger the animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }
}

function sendFeedback() {
    const phoneNumber = "08159035074";
    const message = "Hello THE RaTELs Admin, I have a suggestion/feedback about the website:";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = document.querySelector(`#${fieldId} + .show-password i`);
    if (field.type === "password") {
        field.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        field.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

function selectGender(gender) {
    selectedGender = gender;
    const maleOption = document.querySelector('.gender-option.male');
    const femaleOption = document.querySelector('.gender-option.female');
    
    if (gender === 'male') {
        maleOption.classList.add('selected');
        femaleOption.classList.remove('selected');
        document.getElementById('robotAvatar').textContent = "";
    } else {
        femaleOption.classList.add('selected');
        maleOption.classList.remove('selected');
        document.getElementById('robotAvatar').textContent = "";
    }
}

// File Upload Functions
function handleProfilePictureUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('error', 'Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showNotification('error', 'Image size should be less than 2MB');
        return;
    }
    
    profilePictureFile = file;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('profilePicturePreview').src = e.target.result;
        document.getElementById('profilePicturePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function uploadProfilePicture() {
    const fileInput = document.getElementById('profilePicUpload');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('error', 'Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showNotification('error', 'Image size should be less than 2MB');
        return;
    }
    
    showLoading("Uploading profile picture...");
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Update user's profile picture in database
        users = users.map(user => {
            if (user.id === currentUser.id) {
                return {...user, profilePic: e.target.result};
            }
            return user;
        });
        
        currentUser.profilePic = e.target.result;
        saveDataToStorage();
        
        // Update the profile pic display
        const profilePicContainer = document.querySelector('.profile-pic-container');
        profilePicContainer.innerHTML = `
            <img id="userProfilePic" class="profile-pic" src="${e.target.result}" alt="Profile Picture">
            <label class="profile-pic-upload">
                <input type="file" id="profilePicUpload" accept="image/*" onchange="uploadProfilePicture()">
                <i class="fas fa-camera"></i>
            </label>
        `;
        
        showNotification('success', 'Profile picture updated successfully!');
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "profile-update",
            userId: currentUser.id,
            username: currentUser.username,
            message: `${currentUser.username} updated their profile picture`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        hideLoading();
    };
    reader.onerror = function() {
        showNotification('error', 'Error uploading profile picture');
        hideLoading();
    };
    reader.readAsDataURL(file);
}

function uploadClanBanner() {
    const fileInput = document.getElementById('clanBannerUpload');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('error', 'Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showNotification('error', 'Image size should be less than 5MB');
        return;
    }
    
    showLoading("Uploading clan banner...");
    
    const reader = new FileReader();
    reader.onload = function(e) {
        clanSettings.banner = e.target.result;
        saveDataToStorage();
        
        document.getElementById('clanBannerImg').src = e.target.result;
        document.getElementById('clanBannerImg').style.display = 'block';
        
        showNotification('success', 'Clan banner updated successfully!');
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "clan-settings",
            userId: currentUser.id,
            username: currentUser.username,
            message: `${currentUser.username} updated the clan banner`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        hideLoading();
    };
    reader.onerror = function() {
        showNotification('error', 'Error uploading clan banner');
        hideLoading();
    };
    reader.readAsDataURL(file);
}

function previewClanLogo() {
    const fileInput = document.getElementById('clanLogo');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('error', 'Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('clanLogoPreview').src = e.target.result;
        document.getElementById('clanLogoPreview').style.display = 'block';
        clanSettings.logo = e.target.result;
        saveDataToStorage();
    };
    reader.readAsDataURL(file);
}

function previewClanBanner() {
    const fileInput = document.getElementById('clanBanner');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('error', 'Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('clanBannerPreview').src = e.target.result;
        document.getElementById('clanBannerPreview').style.display = 'block';
        clanSettings.banner = e.target.result;
        saveDataToStorage();
    };
    reader.readAsDataURL(file);
}

function previewWebsiteLogo() {
    const fileInput = document.getElementById('websiteLogo');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('error', 'Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('websiteLogoPreview').src = e.target.result;
        document.getElementById('websiteLogoPreview').style.display = 'block';
        websiteSettings.logo = e.target.result;
        saveDataToStorage();
    };
    reader.readAsDataURL(file);
}

function previewWebsiteBackground() {
    const fileInput = document.getElementById('websiteBackground');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('error', 'Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('websiteBackgroundPreview').src = e.target.result;
        document.getElementById('websiteBackgroundPreview').style.display = 'block';
        websiteSettings.background = e.target.result;
        saveDataToStorage();
    };
    reader.readAsDataURL(file);
}

function updateMemberAvatar(memberId) {
    const fileInput = document.getElementById(`memberAvatarUpload_${memberId}`);
    const file = fileInput.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('error', 'Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showNotification('error', 'Image size should be less than 2MB');
        return;
    }
    
    showLoading("Updating member avatar...");
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById(`memberAvatar_${memberId}`);
        img.src = e.target.result;
        
        // Update in clan settings
        const memberIndex = clanSettings.topMembers.findIndex(m => 
            `member${clanSettings.topMembers.indexOf(m) + 1}` === memberId
        );
        
        if (memberIndex !== -1) {
            clanSettings.topMembers[memberIndex].avatar = e.target.result;
            saveDataToStorage();
        }
        
        showNotification('success', 'Member avatar updated!');
        hideLoading();
    };
    reader.onerror = function() {
        showNotification('error', 'Error updating member avatar');
        hideLoading();
    };
    reader.readAsDataURL(file);
}

// Navigation Functions
function showLogin() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('forgotPasswordContainer').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginError').textContent = '';
}

function showForgotPassword() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('forgotPasswordContainer').style.display = 'block';
    document.getElementById('userDashboard').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('forgotError').textContent = '';
    document.getElementById('forgotSuccess').textContent = '';
}

function showRegister() {
    if (!websiteSettings.allowRegistration) {
        showNotification('error', 'New registrations are currently disabled by admin');
        return;
    }
    
    // Reset form
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirmPassword').value = '';
    document.getElementById('regDob').value = '';
    document.getElementById('regCODMName').value = '';
    document.getElementById('regLevel').value = '';
    document.getElementById('regMPRank').value = '';
    document.getElementById('regBRRank').value = '';
    document.getElementById('profilePicture').value = '';
    document.getElementById('profilePicturePreview').src = '';
    document.getElementById('profilePicturePreview').style.display = 'none';
    document.getElementById('registerError').textContent = '';
    document.getElementById('registerSuccess').textContent = '';
    
    // Reset gender selection
    selectedGender = null;
    document.querySelector('.gender-option.male').classList.remove('selected');
    document.querySelector('.gender-option.female').classList.remove('selected');
    document.getElementById('robotAvatar').textContent = "";
    
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
    document.getElementById('forgotPasswordContainer').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Authentication Functions
function resetPassword() {
    const username = document.getElementById('forgotUsername').value.trim();
    const dob = document.getElementById('forgotDob').value;
    
    if (!username || !dob) {
        document.getElementById('forgotError').textContent = "Please enter both username and date of birth!";
        return;
    }
    
    showLoading("Resetting password...");
    
    setTimeout(() => {
        const user = users.find(u => u.username === username && u.dob === dob);
        
        if (!user) {
            document.getElementById('forgotError').textContent = "No account found with those details!";
            hideLoading();
            return;
        }
        
        // Generate a simple temporary password
        const tempPassword = Math.random().toString(36).slice(-8);
        
        // Update user's password
        users = users.map(u => {
            if (u.id === user.id) {
                return {...u, password: tempPassword};
            }
            return u;
        });
        saveDataToStorage();
        
        document.getElementById('forgotError').textContent = "";
        document.getElementById('forgotSuccess').textContent = `Your password has been reset to: ${tempPassword}`;
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "password-reset",
            userId: user.id,
            username: user.username,
            message: `Password reset for ${user.username}`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        hideLoading();
    }, 1000);
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        document.getElementById('loginError').textContent = "Please enter both username and password!";
        return;
    }
    
    showLoading("Authenticating...");
    
    // Simulate network delay
    setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        
        if (!user) {
            document.getElementById('loginError').textContent = "Invalid username or password!";
            hideLoading();
            return;
        }
        
        currentUser = user;
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "login",
            userId: user.id,
            username: user.username,
            message: `User logged in: ${user.username}`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        // Check for unread notifications
        if (user.isAdmin) {
            unreadAdminNotifications = notifications.filter(n => n.userId === 2 && !n.read).length;
            updateAdminNotificationBadge();
        } else {
            const unreadUserNotifications = notifications.filter(n => n.userId === user.id && !n.read);
            if (unreadUserNotifications.length > 0) {
                showNotification('info', `You have ${unreadUserNotifications.length} unread notifications`, 3000);
            }
        }
        
        if (user.isAdmin) {
            showAdminDashboard();
        } else {
            showUserDashboard();
        }
        
        hideLoading();
    }, 1000);
}

function register() {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirmPassword = document.getElementById('regConfirmPassword').value.trim();
    const dob = document.getElementById('regDob').value;
    const codmName = document.getElementById('regCODMName').value.trim();
    const level = parseInt(document.getElementById('regLevel').value);
    const mpRank = document.getElementById('regMPRank').value;
    const brRank = document.getElementById('regBRRank').value;
    
    // Validate inputs
    if (!username || !password || !confirmPassword || !dob || !codmName || !level || !mpRank || !brRank) {
        document.getElementById('registerError').textContent = "All fields are required!";
        return;
    }
    
    if (password.length < 8) {
        document.getElementById('registerError').textContent = "Password must be at least 8 characters!";
        return;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('registerError').textContent = "Passwords do not match!";
        return;
    }
    
    if (level < 1 || level > 400 || isNaN(level)) {
        document.getElementById('registerError').textContent = "Level must be between 1 and 400!";
        return;
    }
    
    if (!selectedGender) {
        document.getElementById('registerError').textContent = "Please select your gender!";
        return;
    }
    
    // Check if username already exists
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        document.getElementById('registerError').textContent = "Username already exists!";
        return;
    }
    
    showLoading("Creating account...");
    
    // Process profile picture if selected
    let profilePic = "";
    if (profilePictureFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic = e.target.result;
            completeRegistration(username, password, dob, codmName, level, mpRank, brRank, profilePic);
        };
        reader.onerror = function() {
            completeRegistration(username, password, dob, codmName, level, mpRank, brRank, "");
        };
        reader.readAsDataURL(profilePictureFile);
    } else {
        completeRegistration(username, password, dob, codmName, level, mpRank, brRank, "");
    }
}

function completeRegistration(username, password, dob, codmName, level, mpRank, brRank, profilePic) {
    // Create new user
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        username,
        password,
        dob,
        codmName,
        level,
        mpRank,
        brRank,
        isAdmin: false,
        status: "Applicant",
        joinDate: new Date().toISOString(),
        notifications: [],
        profilePic,
        gender: selectedGender,
        robotAvatar: selectedGender === 'male' ? "" : ""
    };
    
    users.push(newUser);
    saveDataToStorage();
    
    // Log activity
    const activity = {
        id: activityLogs.length + 1,
        type: "registration",
        userId: newUser.id,
        username: newUser.username,
        message: `New user registered: ${newUser.username} (password: ${newUser.password})`,
        timestamp: new Date().toISOString()
    };
    activityLogs.unshift(activity);
    saveDataToStorage();
    
    // Notify admin
    addUserNotification(
        2, // Admin user ID
        "new-user",
        "New User Registration",
        `User '${newUser.username}' (password: ${newUser.password}) just registered to THE RaTELs clan website`,
        newUser.id
    );
    
    document.getElementById('registerError').textContent = "";
    document.getElementById('registerSuccess').textContent = "Account created successfully!";
    
    // Auto login after registration
    setTimeout(() => {
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;
        login();
    }, 1000);
}

// Dashboard Functions
function showUserDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('forgotPasswordContainer').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'block';
    
    // Update user info
    document.getElementById('dashboardUsername').textContent = currentUser.username;
    document.getElementById('dashboardGender').textContent = currentUser.gender === 'male' ? 'Male' : 'Female';
    document.getElementById('dashboardCODMName').textContent = currentUser.codmName;
    document.getElementById('dashboardLevel').textContent = currentUser.level;
    document.getElementById('dashboardMPRank').textContent = currentUser.mpRank;
    document.getElementById('dashboardBRRank').textContent = currentUser.brRank;
    
    // Set profile picture
    const profilePicContainer = document.querySelector('.profile-pic-container');
    if (currentUser.profilePic) {
        profilePicContainer.innerHTML = `
            <img id="userProfilePic" class="profile-pic" src="${currentUser.profilePic}" alt="Profile Picture">
            <label class="profile-pic-upload">
                <input type="file" id="profilePicUpload" accept="image/*" onchange="uploadProfilePicture()">
                <i class="fas fa-camera"></i>
            </label>
        `;
    } else {
        profilePicContainer.innerHTML = `
            <div class="robot-avatar" id="userRobotAvatar">${currentUser.robotAvatar}</div>
            <label class="profile-pic-upload">
                <input type="file" id="profilePicUpload" accept="image/*" onchange="uploadProfilePicture()">
                <i class="fas fa-camera"></i>
            </label>
        `;
    }
    
    // Set status
    const statusElement = document.getElementById('dashboardStatus');
    statusElement.textContent = currentUser.status;
    statusElement.className = 'status-badge';
    
    if (currentUser.status === "Pending") {
        statusElement.classList.add('status-pending');
    } else if (currentUser.status === "Accepted") {
        statusElement.classList.add('status-accepted');
    } else if (currentUser.status === "Rejected") {
        statusElement.classList.add('status-rejected');
    } else if (currentUser.status === "Member") {
        statusElement.classList.add('status-member');
    } else if (currentUser.status === "Admin") {
        statusElement.classList.add('status-admin');
    } else if (currentUser.status === "Applicant") {
        statusElement.classList.add('status-applicant');
    }
    
    // Show/hide banner upload button based on admin status
    document.getElementById('clanBannerUploadBtn').style.display = currentUser.isAdmin ? 'block' : 'none';
    
    // Set clan banner
    const clanBannerImg = document.getElementById('clanBannerImg');
    if (clanSettings.banner) {
        clanBannerImg.src = clanSettings.banner;
        clanBannerImg.style.display = 'block';
    } else {
        clanBannerImg.src = '';
        clanBannerImg.style.display = 'none';
    }
    
    // Check for existing application
    const userApp = applications.find(app => app.userId === currentUser.id);
    if (userApp) {
        document.getElementById('statusMessage').innerHTML = `
            <p>Your application status: 
                <span class="status-badge status-${userApp.status.toLowerCase()}">
                    ${userApp.status}
                </span>
            </p>
            <p>Submitted on: ${formatDate(userApp.applyDate)}</p>
            <p>MP Rank: ${userApp.mpRank} | BR Rank: ${userApp.brRank}</p>
            <p>Level: ${userApp.level}</p>
            <p>Reason: ${userApp.reason}</p>
        `;
    }
    
    // Update clan info display
    updateClanInfoDisplay();
    
    // Reset tabs to default
    document.querySelectorAll('#userDashboard .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#userDashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector('#userDashboard .tab').classList.add('active');
    document.querySelector('#userDashboard .tab-content').classList.add('active');
}

function showAdminDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('forgotPasswordContainer').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    
    // Update last login time
    document.getElementById('lastLoginTime').textContent = formatDate(new Date());
    
    // Load applications
    loadApplications();
    
    // Load users
    loadUsers();
    
    // Load members activity
    loadMembersActivity();
    
    // Load activity logs
    loadActivityLogs();
    
    // Load notifications
    loadNotifications();
    
    // Load clan settings
    loadClanSettings();
    
    // Load website settings
    loadWebsiteSettings();
    
    // Reset tabs to default
    document.querySelectorAll('#adminDashboard .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#adminDashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector('#adminDashboard .tab').classList.add('active');
    document.querySelector('#adminDashboard .tab-content').classList.add('active');
}

// Admin Panel Functions
function loadApplications() {
    const applicationsList = document.getElementById('applicationsList');
    applicationsList.innerHTML = '';
    
    const pendingApps = applications.filter(app => app.status === "Pending");
    const pendingCount = document.getElementById('pendingAppsCount');
    
    if (pendingApps.length === 0) {
        applicationsList.innerHTML = '<p>No pending applications.</p>';
        pendingCount.style.display = 'none';
    } else {
        pendingCount.textContent = pendingApps.length;
        pendingCount.style.display = 'inline-block';
        
        pendingApps.forEach(app => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h4>${app.codmName} (${app.username})</h4>
                <p>Level: ${app.level} | MP: ${app.mpRank} | BR: ${app.brRank}</p>
                <p>Applied on: ${formatDate(app.applyDate)}</p>
                <p>${app.reason}</p>
                <div class="admin-actions">
                    <button class="accept-btn" onclick="updateApplication(${app.id}, 'Accepted')">
                        <i class="fas fa-check"></i> Accept
                    </button>
                    <button class="reject-btn" onclick="updateApplication(${app.id}, 'Rejected')">
                        <i class="fas fa-times"></i> Reject
                    </button>
                </div>
            `;
            applicationsList.appendChild(card);
        });
    }
}

function loadUsers() {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    
    const regularUsers = users.filter(user => !user.isAdmin);
    
    if (regularUsers.length === 0) {
        usersList.innerHTML = '<p>No users found.</p>';
    } else {
        regularUsers.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            
            let avatarContent = '';
            if (user.profilePic) {
                avatarContent = `<img src="${user.profilePic}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; object-fit: cover;">`;
            } else {
                avatarContent = `<div style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; background: #333; color: white; display: flex; align-items: center; justify-content: center; font-size: 20px;">${user.robotAvatar}</div>`;
            }
            
            card.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    ${avatarContent}
                    <div>
                        <h4>${user.username} (${user.codmName})</h4>
                        <p>Level: ${user.level} | MP: ${user.mpRank} | BR: ${user.brRank}</p>
                    </div>
                </div>
                <p>Gender: ${user.gender === 'male' ? 'Male' : 'Female'}</p>
                <p>Status: <span class="status-badge status-${user.status.toLowerCase()}">${user.status}</span></p>
                <p>Joined: ${formatDate(user.joinDate)}</p>
                <p>Password: ${user.password}</p>
                <div class="admin-actions">
                    <button class="accept-btn" onclick="updateUserStatus(${user.id}, 'Member')">
                        <i class="fas fa-user-check"></i> Make Member
                    </button>
                    <button class="reject-btn" onclick="updateUserStatus(${user.id}, 'Applicant')">
                        <i class="fas fa-user-edit"></i> Set as Applicant
                    </button>
                    <button class="ban-btn" onclick="banUser(${user.id})">
                        <i class="fas fa-ban"></i> Ban User
                    </button>
                </div>
            `;
            usersList.appendChild(card);
        });
    }
}

function loadMembersActivity() {
    const membersActivityLog = document.getElementById('membersActivityLog');
    membersActivityLog.innerHTML = '';
    
    const userActivities = activityLogs.filter(log => 
        log.type === "login" || 
        log.type === "profile-update" || 
        log.type === "password-change" ||
        log.type === "application"
    );
    
    if (userActivities.length === 0) {
        membersActivityLog.innerHTML = '<p>No member activity found.</p>';
        return;
    }
    
    userActivities.forEach(log => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        let icon = '';
        let color = 'inherit';
        
        switch(log.type) {
            case 'login':
                icon = '';
                break;
            case 'profile-update':
                icon = '';
                color = 'var(--info)';
                break;
            case 'password-change':
                icon = '';
                break;
            case 'application':
                icon = '';
                color = 'var(--info)';
                break;
            default:
                icon = '';
        }
        
        item.innerHTML = `
            <div style="color: ${color}">${icon} ${log.message}</div>
            <div class="activity-time">${formatDate(log.timestamp)}</div>
        `;
        membersActivityLog.appendChild(item);
    });
}

function loadActivityLogs() {
    const activityLog = document.getElementById('activityLog');
    activityLog.innerHTML = '';
    
    if (activityLogs.length === 0) {
        activityLog.innerHTML = '<p>No activity logs found.</p>';
        return;
    }
    
    activityLogs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        let icon = '';
        let color = 'inherit';
        
        switch(log.type) {
            case 'login':
                icon = '';
                break;
            case 'registration':
                icon = '';
                color = 'var(--success)';
                break;
            case 'application':
                icon = '';
                color = 'var(--info)';
                break;
            case 'status-change':
                icon = '';
                color = 'var(--warning)';
                break;
            case 'ban':
                icon = '';
                color = 'var(--danger)';
                break;
            case 'password-change':
                icon = '';
                break;
            case 'account-delete':
                icon = '';
                color = 'var(--danger)';
                break;
            case 'clan-settings':
                icon = '';
                color = 'var(--primary)';
                break;
            case 'profile-update':
                icon = '';
                color = 'var(--info)';
                break;
            case 'website-settings':
                icon = '';
                color = 'var(--legendary)';
                break;
            default:
                icon = '';
        }
        
        item.innerHTML = `
            <div style="color: ${color}">${icon} ${log.message}</div>
            <div class="activity-time">${formatDate(log.timestamp)}</div>
        `;
        activityLog.appendChild(item);
    });
}

function loadNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = '';
    
    const adminNotifications = notifications
        .filter(n => n.userId === 2) // Admin user ID is 2
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (adminNotifications.length === 0) {
        notificationsList.innerHTML = '<p>No notifications found.</p>';
        return;
    }
    
    adminNotifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        let icon = '';
        let color = 'inherit';
        
        switch(notification.type) {
            case 'new-application':
                icon = '';
                color = 'var(--info)';
                break;
            case 'new-user':
                icon = '';
                color = 'var(--success)';
                break;
            case 'user-action':
                icon = '';
                color = 'var(--warning)';
                break;
            default:
                icon = '';
        }
        
        item.innerHTML = `
            <div style="color: ${color}">
                <strong>${notification.title}</strong><br>
                ${notification.message}
            </div>
            <div class="activity-time">${formatDate(notification.timestamp)}</div>
        `;
        
        if (!notification.read) {
            item.style.backgroundColor = 'rgba(255, 70, 85, 0.1)';
            item.style.borderLeft = '3px solid var(--primary)';
            item.onclick = function() {
                markNotificationAsRead(notification.id);
                item.style.backgroundColor = '';
                item.style.borderLeft = '';
            };
        }
        
        notificationsList.appendChild(item);
    });
}

function loadClanSettings() {
    document.getElementById('clanName').value = clanSettings.name;
    document.getElementById('clanTag').value = clanSettings.tag;
    
    // Reset file inputs
    document.getElementById('clanLogo').value = '';
    document.getElementById('clanBanner').value = '';
    
    document.getElementById('totalMembersSetting').value = clanSettings.stats.totalMembers;
    document.getElementById('legendaryPlayersSetting').value = clanSettings.stats.legendaryPlayers;
    document.getElementById('avgLevelSetting').value = clanSettings.stats.avgLevel;
    document.getElementById('winRateSetting').value = clanSettings.stats.winRate;
    
    // Show previews if URLs exist
    if (clanSettings.logo) {
        document.getElementById('clanLogoPreview').src = clanSettings.logo;
        document.getElementById('clanLogoPreview').style.display = 'block';
    }
    
    if (clanSettings.banner) {
        document.getElementById('clanBannerPreview').src = clanSettings.banner;
        document.getElementById('clanBannerPreview').style.display = 'block';
    }
    
    // Load activities
    const activitiesContainer = document.getElementById('clanActivities');
    activitiesContainer.innerHTML = '';
    clanSettings.activities.forEach((activity, index) => {
        addActivityField(activity.icon, activity.text, activity.daysAgo, 'activity' + (index + 1));
    });
    
    // Load top members
    const topMembersContainer = document.getElementById('topMembers');
    topMembersContainer.innerHTML = '';
    clanSettings.topMembers.forEach((member, index) => {
        addTopMemberField(
            member.initials, 
            member.name, 
            member.level, 
            member.mpRank, 
            member.brRank, 
            member.avatar,
            'member' + (index + 1)
        );
    });
}

function loadWebsiteSettings() {
    document.getElementById('websiteName').value = websiteSettings.name;
    document.getElementById('websiteTagline').value = websiteSettings.tagline;
    
    // Reset file inputs
    document.getElementById('websiteLogo').value = '';
    document.getElementById('websiteBackground').value = '';
    
    document.getElementById('websiteTheme').value = websiteSettings.theme;
    document.getElementById('websiteRegistration').value = websiteSettings.allowRegistration ? 'true' : 'false';
    
    // Show previews if URLs exist
    if (websiteSettings.logo) {
        document.getElementById('websiteLogoPreview').src = websiteSettings.logo;
        document.getElementById('websiteLogoPreview').style.display = 'block';
    }
    
    if (websiteSettings.background) {
        document.getElementById('websiteBackgroundPreview').src = websiteSettings.background;
        document.getElementById('websiteBackgroundPreview').style.display = 'block';
    }
}

// Clan Management Functions
function addActivityField(icon = "", text = "", daysAgo = 0, id = null) {
    const activitiesContainer = document.getElementById('clanActivities');
    const activityId = id || 'activity' + Date.now();
    
    const activityDiv = document.createElement('div');
    activityDiv.className = 'activity-edit-item';
    activityDiv.innerHTML = `
        <button class="remove-activity" onclick="removeActivityField('${activityId}')">�</button>
        <div class="form-group">
            <label>Icon</label>
            <input type="text" id="activityIcon_${activityId}" value="${icon}" placeholder="Enter emoji icon">
        </div>
        <div class="form-group">
            <label>Activity Text</label>
            <input type="text" id="activityText_${activityId}" value="${text}" placeholder="Enter activity description">
        </div>
        <div class="form-group">
            <label>Days Ago</label>
            <input type="number" id="activityDays_${activityId}" value="${daysAgo}" min="0" placeholder="How many days ago">
        </div>
    `;
    
    activitiesContainer.appendChild(activityDiv);
}

function addTopMemberField(initials = "", name = "", level = "", mpRank = "", brRank = "", avatar = "", id = null) {
    const topMembersContainer = document.getElementById('topMembers');
    const memberId = id || 'member' + Date.now();
    
    const memberDiv = document.createElement('div');
    memberDiv.className = 'member-edit-item';
    memberDiv.innerHTML = `
        <button class="remove-member" onclick="removeMemberField('${memberId}')">�</button>
        <div class="member-edit-fields">
            <div class="member-avatar-edit">
                <img id="memberAvatar_${memberId}" src="${avatar || 'https://via.placeholder.com/40'}" alt="${initials}">
                <input type="file" id="memberAvatarUpload_${memberId}" accept="image/*" style="display: none;" onchange="updateMemberAvatar('${memberId}')">
                <label for="memberAvatarUpload_${memberId}" style="position: absolute; bottom: -5px; right: -5px; background: var(--primary); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer;">+</label>
            </div>
            <div style="flex: 1;">
                <div class="form-group">
                    <input type="text" id="memberName_${memberId}" value="${name}" placeholder="Member name">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Level</label>
            <input type="number" id="memberLevel_${memberId}" value="${level}" min="1" max="400" placeholder="Member level">
        </div>
        <div class="rank-info">
            <div class="rank-column">
                <label>MP Rank</label>
                <select id="memberMPRank_${memberId}">
                    <option value="Rookie" ${mpRank === "Rookie" ? "selected" : ""}>Rookie</option>
                    <option value="Veteran" ${mpRank === "Veteran" ? "selected" : ""}>Veteran</option>
                    <option value="Elite" ${mpRank === "Elite" ? "selected" : ""}>Elite</option>
                    <option value="Pro" ${mpRank === "Pro" ? "selected" : ""}>Pro</option>
                    <option value="Master" ${mpRank === "Master" ? "selected" : ""}>Master</option>
                    <option value="Legendary" ${mpRank === "Legendary" ? "selected" : ""}>Legendary</option>
                </select>
            </div>
            <div class="rank-column">
                <label>BR Rank</label>
                <select id="memberBRRank_${memberId}">
                    <option value="Rookie" ${brRank === "Rookie" ? "selected" : ""}>Rookie</option>
                    <option value="Veteran" ${brRank === "Veteran" ? "selected" : ""}>Veteran</option>
                    <option value="Elite" ${brRank === "Elite" ? "selected" : ""}>Elite</option>
                    <option value="Pro" ${brRank === "Pro" ? "selected" : ""}>Pro</option>
                    <option value="Master" ${brRank === "Master" ? "selected" : ""}>Master</option>
                    <option value="Legendary" ${brRank === "Legendary" ? "selected" : ""}>Legendary</option>
                </select>
            </div>
        </div>
    `;
    
    topMembersContainer.appendChild(memberDiv);
}

function removeActivityField(id) {
    if (document.querySelectorAll('.activity-edit-item').length <= 1) {
        showNotification('error', 'You must have at least one activity item');
        return;
    }
    
    const activityDiv = document.querySelector(`.activity-edit-item button[onclick="removeActivityField('${id}')"]`)?.parentElement;
    if (activityDiv) {
        activityDiv.remove();
    }
}

function removeMemberField(id) {
    if (document.querySelectorAll('.member-edit-item').length <= 1) {
        showNotification('error', 'You must have at least one top member');
        return;
    }
    
    const memberDiv = document.querySelector(`.member-edit-item button[onclick="removeMemberField('${id}')"]`)?.parentElement;
    if (memberDiv) {
        memberDiv.remove();
    }
}

function saveClanSettings() {
    showLoading("Saving clan settings...");
    
    try {
        // Basic info
        clanSettings.name = document.getElementById('clanName').value || "THE RaTELs";
        clanSettings.tag = document.getElementById('clanTag').value || "GOAT";
        
        // Stats
        clanSettings.stats = {
            totalMembers: parseInt(document.getElementById('totalMembersSetting').value) || 0,
            legendaryPlayers: parseInt(document.getElementById('legendaryPlayersSetting').value) || 0,
            avgLevel: parseInt(document.getElementById('avgLevelSetting').value) || 1,
            winRate: parseInt(document.getElementById('winRateSetting').value) || 0
        };
        
        // Activities
        clanSettings.activities = [];
        const activityItems = document.querySelectorAll('.activity-edit-item');
        activityItems.forEach(item => {
            const id = item.querySelector('button').onclick.toString().match(/'([^']+)'/)[1];
            clanSettings.activities.push({
                icon: document.getElementById(`activityIcon_${id}`).value || "",
                text: document.getElementById(`activityText_${id}`).value || "",
                daysAgo: parseInt(document.getElementById(`activityDays_${id}`).value) || 0
            });
        });
        
        // Top members
        clanSettings.topMembers = [];
        const memberItems = document.querySelectorAll('.member-edit-item');
        memberItems.forEach(item => {
            const id = item.querySelector('button').onclick.toString().match(/'([^']+)'/)[1];
            clanSettings.topMembers.push({
                initials: document.getElementById(`memberName_${id}`).value.substring(0, 2).toUpperCase(),
                name: document.getElementById(`memberName_${id}`).value || "Unknown",
                level: parseInt(document.getElementById(`memberLevel_${id}`).value) || 1,
                mpRank: document.getElementById(`memberMPRank_${id}`).value || "Rookie",
                brRank: document.getElementById(`memberBRRank_${id}`).value || "Rookie",
                avatar: document.getElementById(`memberAvatar_${id}`).src
            });
        });
        
        saveDataToStorage();
        
        // Update clan info display
        updateClanInfoDisplay();
        
        document.getElementById('clanSettingsError').textContent = "";
        document.getElementById('clanSettingsSuccess').textContent = "Clan settings saved successfully!";
        showNotification('success', 'Clan settings updated successfully!');
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "clan-settings",
            userId: currentUser.id,
            username: currentUser.username,
            message: `${currentUser.username} updated clan settings`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
    } catch (error) {
        document.getElementById('clanSettingsError').textContent = "Error saving clan settings: " + error.message;
        document.getElementById('clanSettingsSuccess').textContent = "";
        showNotification('error', 'Error saving clan settings');
    } finally {
        hideLoading();
    }
}

function saveWebsiteSettings() {
    showLoading("Saving website settings...");
    
    try {
        // Basic info
        websiteSettings.name = document.getElementById('websiteName').value || "RaTEL CoDM";
        websiteSettings.tagline = document.getElementById('websiteTagline').value || "CRYPTO SQUAD ";
        websiteSettings.theme = document.getElementById('websiteTheme').value;
        websiteSettings.allowRegistration = document.getElementById('websiteRegistration').value === 'true';
        
        saveDataToStorage();
        
        // Update website display
        updateWebsiteDisplay();
        
        document.getElementById('websiteSettingsError').textContent = "";
        document.getElementById('websiteSettingsSuccess').textContent = "Website settings saved successfully!";
        showNotification('success', 'Website settings updated successfully!');
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "website-settings",
            userId: currentUser.id,
            username: currentUser.username,
            message: `${currentUser.username} updated website settings`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
    } catch (error) {
        document.getElementById('websiteSettingsError').textContent = "Error saving website settings: " + error.message;
        document.getElementById('websiteSettingsSuccess').textContent = "";
        showNotification('error', 'Error saving website settings');
    } finally {
        hideLoading();
    }
}

// Display Update Functions
function updateClanInfoDisplay() {
    // Update stats
    document.getElementById('totalMembers').textContent = clanSettings.stats.totalMembers;
    document.getElementById('legendaryPlayers').textContent = clanSettings.stats.legendaryPlayers;
    document.getElementById('avgLevel').textContent = clanSettings.stats.avgLevel;
    document.getElementById('winRate').textContent = clanSettings.stats.winRate + "%";
    
    // Update activities
    const activityLog = document.getElementById('clanActivityLog');
    if (activityLog) {
        activityLog.innerHTML = '';
        clanSettings.activities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div>${activity.icon} ${activity.text}</div>
                <div class="activity-time">${activity.daysAgo} day${activity.daysAgo !== 1 ? 's' : ''} ago</div>
            `;
            activityLog.appendChild(item);
        });
    }
    
    // Update top members
    const memberList = document.getElementById('clanTopMembers');
    if (memberList) {
        memberList.innerHTML = '';
        clanSettings.topMembers.forEach(member => {
            const item = document.createElement('div');
            item.className = 'member-item';
            
            let avatarContent = '';
            if (member.avatar) {
                avatarContent = `<img src="${member.avatar}" alt="${member.initials}">`;
            } else {
                avatarContent = `<div style="width: 40px; height: 40px; border-radius: 50%; background: #333; color: white; display: flex; align-items: center; justify-content: center; font-size: 16px;">${member.initials}</div>`;
            }
            
            item.innerHTML = `
                <div class="member-avatar">${avatarContent}</div>
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-details">Level ${member.level} | MP: ${member.mpRank} | BR: ${member.brRank}</div>
                </div>
            `;
            memberList.appendChild(item);
        });
    }
    
    // Update clan name in header if needed
    const logoElements = document.querySelectorAll('.logo');
    logoElements.forEach(el => {
        el.textContent = clanSettings.name;
    });
    
    // Update clan banner
    const clanBannerImg = document.getElementById('clanBannerImg');
    if (clanSettings.banner) {
        clanBannerImg.src = clanSettings.banner;
        clanBannerImg.style.display = 'block';
    } else {
        clanBannerImg.style.display = 'none';
    }
    
    // Update logo preview
    const logoPreview = document.getElementById('clanLogoPreview');
    if (clanSettings.logo) {
        logoPreview.src = clanSettings.logo;
        logoPreview.style.display = 'block';
    } else {
        logoPreview.style.display = 'none';
    }
}

function updateWebsiteDisplay() {
    // Update main logo and tagline
    document.getElementById('mainLogo').textContent = websiteSettings.name;
    document.getElementById('mainTagline').textContent = websiteSettings.tagline;
    document.getElementById('registerLogo').textContent = "Join " + websiteSettings.name;
    
    // Update background
    if (websiteSettings.background) {
        document.body.style.backgroundImage = `url('${websiteSettings.background}')`;
    } else {
        document.body.style.backgroundImage = '';
    }
    
    // Update logo preview
    const logoPreview = document.getElementById('websiteLogoPreview');
    if (websiteSettings.logo) {
        logoPreview.src = websiteSettings.logo;
        logoPreview.style.display = 'block';
    } else {
        logoPreview.style.display = 'none';
    }
    
    // Update background preview
    const backgroundPreview = document.getElementById('websiteBackgroundPreview');
    if (websiteSettings.background) {
        backgroundPreview.src = websiteSettings.background;
        backgroundPreview.style.display = 'block';
    } else {
        backgroundPreview.style.display = 'none';
    }
    
    // Update theme
    applyTheme(websiteSettings.theme);
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    switch(theme) {
        case 'blue':
            root.style.setProperty('--primary', '#2196F3');
            break;
        case 'green':
            root.style.setProperty('--primary', '#4CAF50');
            break;
        case 'purple':
            root.style.setProperty('--primary', '#9c27b0');
            break;
        case 'gold':
            root.style.setProperty('--primary', '#FFD700');
            break;
        default: // default theme
            root.style.setProperty('--primary', '#ff4655');
    }
}

// Application Management Functions
function updateApplication(id, status) {
    showLoading("Updating application...");
    
    setTimeout(() => {
        const app = applications.find(a => a.id === id);
        if (!app) {
            hideLoading();
            return;
        }
        
        applications = applications.map(a => {
            if (a.id === id) {
                return {...a, status, reviewed: true};
            }
            return a;
        });
        saveDataToStorage();
        
        // Update user status if accepted
        if (status === "Accepted") {
            users = users.map(user => {
                if (user.id === app.userId) {
                    return {...user, status: "Member"};
                }
                return user;
            });
            saveDataToStorage();
        }
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "status-change",
            userId: app.userId,
            username: app.username,
            message: `Application ${status.toLowerCase()} for ${app.username} (${app.codmName})`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        // Notify user
        const notificationType = status === "Accepted" ? "success" : "warning";
        const notificationMessage = status === "Accepted" 
            ? `Congratulations! Your application to join ${clanSettings.name} has been accepted.` 
            : `Your application to join ${clanSettings.name} has been rejected.`;
        
        addUserNotification(
            app.userId,
            "application-status",
            "Application Update",
            notificationMessage,
            app.id
        );
        
        // Show notification to admin
        showNotification('success', `Application ${status.toLowerCase()} for ${app.username}`);
        
        loadApplications();
        hideLoading();
    }, 1000);
}

function updateUserStatus(userId, status) {
    showLoading("Updating user status...");
    
    setTimeout(() => {
        const user = users.find(u => u.id === userId);
        if (!user) {
            hideLoading();
            return;
        }
        
        users = users.map(u => {
            if (u.id === userId) {
                return {...u, status};
            }
            return u;
        });
        saveDataToStorage();
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "status-change",
            userId: user.id,
            username: user.username,
            message: `Status changed to ${status} for ${user.username}`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        // Notify user
        addUserNotification(
            userId,
            "status-change",
            "Status Update",
            `Your clan status has been updated to ${status}`,
            userId
        );
        
        loadUsers();
        hideLoading();
    }, 1000);
}

function banUser(userId) {
    if (!confirm(`Are you sure you want to ban this user? This action cannot be undone.`)) {
        return;
    }
    
    showLoading("Banning user...");
    
    setTimeout(() => {
        const user = users.find(u => u.id === userId);
        if (!user) {
            hideLoading();
            return;
        }
        
        users = users.filter(u => u.id !== userId);
        applications = applications.filter(app => app.userId !== userId);
        saveDataToStorage();
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "ban",
            userId: user.id,
            username: user.username,
            message: `User banned: ${user.username} (${user.codmName})`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        // Notify user if they're currently logged in
        if (currentUser && currentUser.id === userId) {
            showNotification('error', 'Your account has been banned by an admin.');
            setTimeout(logout, 3000);
        }
        
        loadUsers();
        hideLoading();
    }, 1000);
}

// Notification Functions
function addUserNotification(userId, type, title, message, relatedId) {
    const notification = {
        id: notifications.length + 1,
        userId,
        type,
        title,
        message,
        timestamp: new Date().toISOString(),
        read: false,
        relatedId
    };
    
    notifications.push(notification);
    saveDataToStorage();
    
    // Update admin notification badge if needed
    if (userId === 2 && currentUser && currentUser.id === 2) {
        unreadAdminNotifications++;
        updateAdminNotificationBadge();
    }
    
    return notification;
}

function markNotificationAsRead(id) {
    notifications = notifications.map(n => {
        if (n.id === id) {
            return {...n, read: true};
        }
        return n;
    });
    saveDataToStorage();
    
    if (currentUser && currentUser.id === 2) {
        unreadAdminNotifications--;
        updateAdminNotificationBadge();
    }
}

function updateAdminNotificationBadge() {
    const badge = document.getElementById('adminNotificationBadge');
    if (unreadAdminNotifications > 0) {
        badge.textContent = unreadAdminNotifications;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Tab Navigation Functions
function switchTab(tabId) {
    document.querySelectorAll('#userDashboard .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#userDashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function switchAdminTab(tabId) {
    document.querySelectorAll('#adminDashboard .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#adminDashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
    
    // Mark notifications as read when viewing them
    if (tabId === 'notificationsTab') {
        notifications.forEach(n => {
            if (n.userId === 2 && !n.read) {
                markNotificationAsRead(n.id);
            }
        });
    }
}

// Application Form Functions
function showApplicationForm() {
    document.getElementById('applicationForm').style.display = 'block';
    document.getElementById('statusMessage').style.display = 'none';
}

function hideApplicationForm() {
    document.getElementById('applicationForm').style.display = 'none';
    document.getElementById('statusMessage').style.display = 'block';
}

function submitApplication() {
    const reason = document.getElementById('applicationReason').value.trim();
    
    if (!reason || reason.length < 10) {
        alert("Please provide at least 10 characters explaining why you want to join!");
        return;
    }
    
    showLoading("Submitting application...");
    
    setTimeout(() => {
        // Remove any existing application
        applications = applications.filter(app => app.userId !== currentUser.id);
        
        const newApp = {
            id: applications.length + 1,
            userId: currentUser.id,
            username: currentUser.username,
            codmName: currentUser.codmName,
            level: currentUser.level,
            mpRank: currentUser.mpRank,
            brRank: currentUser.brRank,
            reason,
            status: "Pending",
            applyDate: new Date().toISOString(),
            reviewed: false
        };
        
        applications.push(newApp);
        saveDataToStorage();
        
        // Update user status
        users = users.map(user => {
            if (user.id === currentUser.id) {
                return {...user, status: "Pending"};
            }
            return user;
        });
        saveDataToStorage();
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "application",
            userId: currentUser.id,
            username: currentUser.username,
            message: `New application submitted by ${currentUser.username}`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        // Notify admin
        addUserNotification(
            2, // Admin user ID
            "new-application",
            "New Clan Application",
            `${currentUser.username} has submitted an application to join the clan`,
            newApp.id
        );
        
        // Notify user
        addUserNotification(
            currentUser.id,
            "application-status",
            "Application Submitted",
            "Your clan application has been submitted and is pending review",
            newApp.id
        );
        
        document.getElementById('applicationReason').value = "";
        hideApplicationForm();
        showUserDashboard();
        
        showNotification('success', 'Application submitted successfully! The admin has been notified.');
        hideLoading();
    }, 1000);
}

// Account Management Functions
function changePassword() {
    const currentPassword = document.getElementById('changePasswordCurrent').value.trim();
    const newPassword = document.getElementById('changePasswordNew').value.trim();
    const confirmPassword = document.getElementById('changePasswordConfirm').value.trim();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        document.getElementById('passwordChangeError').textContent = "All fields are required!";
        document.getElementById('passwordChangeSuccess').textContent = "";
        return;
    }
    
    if (currentUser.password !== currentPassword) {
        document.getElementById('passwordChangeError').textContent = "Current password is incorrect!";
        document.getElementById('passwordChangeSuccess').textContent = "";
        return;
    }
    
    if (newPassword.length < 8) {
        document.getElementById('passwordChangeError').textContent = "New password must be at least 8 characters!";
        document.getElementById('passwordChangeSuccess').textContent = "";
        return;
    }
    
    if (newPassword !== confirmPassword) {
        document.getElementById('passwordChangeError').textContent = "New passwords don't match!";
        document.getElementById('passwordChangeSuccess').textContent = "";
        return;
    }
    
    showLoading("Updating password...");
    
    setTimeout(() => {
        // Update password
        users = users.map(user => {
            if (user.id === currentUser.id) {
                return {...user, password: newPassword};
            }
            return user;
        });
        saveDataToStorage();
        
        currentUser.password = newPassword;
        
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "password-change",
            userId: currentUser.id,
            username: currentUser.username,
            message: `Password changed for ${currentUser.username}`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        // Notify admin
        addUserNotification(
            2, // Admin user ID
            "user-action",
            "Password Changed",
            `User ${currentUser.username} has changed their password to: ${newPassword}`,
            currentUser.id
        );
        
        document.getElementById('passwordChangeError').textContent = "";
        document.getElementById('passwordChangeSuccess').textContent = "Password changed successfully!";
        
        // Clear fields
        document.getElementById('changePasswordCurrent').value = "";
        document.getElementById('changePasswordNew').value = "";
        document.getElementById('changePasswordConfirm').value = "";
        
        showNotification('success', 'Password changed successfully!');
        hideLoading();
    }, 1000);
}

function confirmDeleteAccount() {
    if (confirm("Are you absolutely sure you want to delete your account? This will permanently remove all your data and cannot be undone.")) {
        deleteAccount();
    }
}

function deleteAccount() {
    showLoading("Deleting account...");
    
    setTimeout(() => {
        // Log activity before deletion
        const activity = {
            id: activityLogs.length + 1,
            type: "account-delete",
            userId: currentUser.id,
            username: currentUser.username,
            message: `Account deleted: ${currentUser.username} (${currentUser.codmName})`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
        
        // Notify admin
        addUserNotification(
            2, // Admin user ID
            "user-action",
            "Account Deleted",
            `${currentUser.username} has deleted their account`,
            currentUser.id
        );
        
        // Remove user data
        users = users.filter(user => user.id !== currentUser.id);
        applications = applications.filter(app => app.userId !== currentUser.id);
        saveDataToStorage();
        
        // Logout
        logout();
        showNotification('error', 'Your account has been permanently deleted.', 3000);
        hideLoading();
    }, 1000);
}

function logout() {
    if (currentUser) {
        // Log activity
        const activity = {
            id: activityLogs.length + 1,
            type: "logout",
            userId: currentUser.id,
            username: currentUser.username,
            message: `User logged out: ${currentUser.username}`,
            timestamp: new Date().toISOString()
        };
        activityLogs.unshift(activity);
        saveDataToStorage();
    }
    
    currentUser = null;
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    showLogin();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Listen for changes from other tabs/windows
    window.addEventListener('storage', function(event) {
        if (event.key === 'goatedClanSettingsUpdated') {
            // Reload settings from localStorage
            users = JSON.parse(localStorage.getItem('goatedClanUsers')) || users;
            applications = JSON.parse(localStorage.getItem('goatedClanApplications')) || applications;
            activityLogs = JSON.parse(localStorage.getItem('goatedClanActivityLogs')) || activityLogs;
            notifications = JSON.parse(localStorage.getItem('goatedClanNotifications')) || notifications;
            clanSettings = JSON.parse(localStorage.getItem('goatedClanSettings')) || clanSettings;
            websiteSettings = JSON.parse(localStorage.getItem('goatedClanWebsiteSettings')) || websiteSettings;
            
            // Update UI if needed
            if (currentUser) {
                if (currentUser.isAdmin) {
                    showAdminDashboard();
                } else {
                    showUserDashboard();
                }
            }
            
            updateWebsiteDisplay();
            updateClanInfoDisplay();
        }
    });
    
    // Set up event listeners
    document.getElementById('profilePicture').addEventListener('change', handleProfilePictureUpload);
    
    showLogin();
    updateWebsiteDisplay();
    
    // Initialize clan info display
    updateClanInfoDisplay();
});