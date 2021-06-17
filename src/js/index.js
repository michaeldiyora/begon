'use strict';
// ====================
// navigation
// ====================
const scrollNav = document.querySelectorAll('.navigation__link,.nav__link');

scrollNav.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// --------------------
// sticky navigation
// --------------------

window.addEventListener('scroll', function () {
  const stickyNav = document.querySelector('.navigation');
  stickyNav.classList.toggle('sticky', window.scrollY > 10);
});

// --------------------
// onClick navigation hide
// --------------------
const hideNav = document.querySelectorAll('.navigation__link');

hideNav.forEach(function (a) {
  a.addEventListener('click', function () {
    document.querySelector('.navigation__checkbox').checked = false;
  });
});

// ====================
// onscroll active link
// ====================

const sections = document.querySelectorAll(
  '#home,#delivery,#service,#subscribe,#footer'
);

function navActive() {
  let scrollDown = window.pageYOffset;

  sections.forEach(function (present) {
    const sectionHeight = present.offsetHeight;
    const sectionUp = present.offsetTop - 175;
    const sectionID = present.getAttribute('id');

    if (scrollDown > sectionUp && scrollDown <= sectionUp + sectionHeight) {
      document
        .querySelector('.navigation__nav a[href*=' + sectionID + ']')
        .classList.add('active');
    } else {
      document
        .querySelector('.navigation__nav a[href*=' + sectionID + ']')
        .classList.remove('active');
    }
  });
}

window.addEventListener('scroll', navActive);
// ====================
//tracking id
// ====================
// only for demo purpose
const trackingBtn = document.querySelector('.btnb--tracking');
const trackingID = document.querySelector('#tracking');
trackingBtn.addEventListener('click', function () {
  const id = '0123456789';
  if (trackingID.value === id) {
    alert('Your parcel is on the way .....');
    trackingID.value = '';
  } else if (trackingID.value == '') {
    alert('Please enter your 10 digit tracking id');
  } else {
    alert('Wrong tracking id');
  }
});

// ====================
// email validation
// ====================

const pattern =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function validMail(email) {
  if (!email) return false;

  const atPattern = email.split('@');

  if (atPattern.length !== 2) return false;

  const account = atPattern[0];
  const address = atPattern[1];

  if (account.length > 64) return false;
  else if (address.length > 255) return false;

  const dotPattern = address.split('.');
  if (
    dotPattern.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  if (!pattern.test(email)) return false;

  return true;
}

const input = document.querySelector('.subscribe__email');
const submitBtn = document.querySelector('.subscribe__btnb');
submitBtn.addEventListener('click', function () {
  const mail = input.value;
  const isValid = validMail(mail);

  if (isValid) {
    alert('Thank you for subscribe');
    input.value = '';
  } else if (mail == '') {
    alert('Please enter your email id');
  } else {
    alert('Please enter your correct email id');
  }
});
