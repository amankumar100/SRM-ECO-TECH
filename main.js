// Slider Script
// ... existing code ...
document.addEventListener('DOMContentLoaded', function() {
  // Slider
  const slides = document.querySelectorAll('.slide');
  const dot1 = document.getElementById('dot1');
  const dot2 = document.getElementById('dot2');
  if (slides.length && dot1 && dot2) {
    const dots = [dot1, dot2];
    let currentSlide = 0;
    let isTransitioning = false;
    function showSlide(index) {
      if (isTransitioning) return;
      isTransitioning = true;
      const currentSlideElement = slides[currentSlide];
      const nextSlideElement = slides[index];
      currentSlideElement.style.transition = 'opacity 1.5s ease-in-out';
      nextSlideElement.style.transition = 'opacity 1.5s ease-in-out';
      currentSlideElement.style.opacity = '0';
      nextSlideElement.style.opacity = '1';
      dots.forEach(dot => dot.classList.replace('bg-primary', 'bg-gray-300'));
      dots[index].classList.replace('bg-gray-300', 'bg-primary');
      setTimeout(() => {
        isTransitioning = false;
        currentSlide = index;
      }, 1500);
    }
    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (index !== currentSlide) {
          showSlide(index);
        }
      });
    });
    setInterval(nextSlide, 7000);
  }

  // Mobile Menu
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileEprMenu = document.getElementById('mobile-epr-menu');
  const mobileEprSubmenu = document.getElementById('mobile-epr-submenu');
  const mobileItMenu = document.getElementById('mobile-it-menu');
  const mobileItSubmenu = document.getElementById('mobile-it-submenu');
  if (mobileMenuButton && mobileMenu && mobileEprMenu && mobileEprSubmenu && mobileItMenu && mobileItSubmenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
      } else {
        mobileMenuButton.innerHTML = '<i class="ri-close-line ri-lg"></i>';
      }
    });
    mobileEprMenu.addEventListener('click', function() {
      mobileEprSubmenu.classList.toggle('hidden');
      const arrow = mobileEprMenu.querySelector('i');
      if (mobileEprSubmenu.classList.contains('hidden')) {
        arrow.className = 'ri-arrow-down-s-line';
      } else {
        arrow.className = 'ri-arrow-up-s-line';
      }
    });
    mobileItMenu.addEventListener('click', function() {
      mobileItSubmenu.classList.toggle('hidden');
      const arrow = mobileItMenu.querySelector('i');
      if (mobileItSubmenu.classList.contains('hidden')) {
        arrow.className = 'ri-arrow-down-s-line';
      } else {
        arrow.className = 'ri-arrow-up-s-line';
      }
    });
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
      });
    });
  }

  // Notice Board Tabs
  const tabCpcb = document.getElementById('tab-cpcb');
  const tabCompany = document.getElementById('tab-company');
  const contentCpcb = document.getElementById('content-cpcb');
  const contentCompany = document.getElementById('content-company');
  if (tabCpcb && tabCompany && contentCpcb && contentCompany) {
    tabCpcb.addEventListener('click', function() {
      tabCpcb.classList.add('text-primary', 'border-primary');
      tabCpcb.classList.remove('text-gray-600');
      tabCompany.classList.remove('text-primary', 'border-primary');
      tabCompany.classList.add('text-gray-600');
      contentCpcb.classList.remove('hidden');
      contentCompany.classList.add('hidden');
    });
    tabCompany.addEventListener('click', function() {
      tabCompany.classList.add('text-primary', 'border-primary');
      tabCompany.classList.remove('text-gray-600');
      tabCpcb.classList.remove('text-primary', 'border-primary');
      tabCpcb.classList.add('text-gray-600');
      contentCompany.classList.remove('hidden');
      contentCpcb.classList.add('hidden');
    });
  }

  // Calendar Script
  const calendarBody = document.getElementById('calendar-body');
  const currentMonthElement = document.getElementById('current-month');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  const timeSlots = document.getElementById('time-slots');
  if (calendarBody && currentMonthElement && prevMonthButton && nextMonthButton && timeSlots) {
    let currentDate = new Date(2025, 5, 2); // June 2, 2025
    let selectedDate = null;
    let selectedTimeSlot = null;
    // Generate calendar
    function generateCalendar(year, month) {
      calendarBody.innerHTML = '';
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = firstDay.getDay();
      currentMonthElement.textContent = firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });
      let date = 1;
      for (let i = 0; i < 6; i++) {
        if (date > daysInMonth) break;
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
          const cell = document.createElement('td');
          if (i === 0 && j < startingDay) {
            cell.classList.add('unavailable');
          } else if (date > daysInMonth) {
            cell.classList.add('unavailable');
          } else {
            cell.textContent = date;
            const cellDate = new Date(year, month, date);
            const today = new Date(2025, 5, 2); // June 2, 2025
            if (cellDate < today) {
              cell.classList.add('unavailable');
            } else if (cellDate.getDay() === 0) {
              cell.classList.add('unavailable');
            } else {
              cell.classList.add('available');
              cell.addEventListener('click', function() {
                const selectedCells = document.querySelectorAll('.custom-calendar td.selected');
                selectedCells.forEach(cell => cell.classList.remove('selected'));
                cell.classList.add('selected');
                selectedDate = new Date(year, month, parseInt(cell.textContent));
                generateTimeSlots();
              });
            }
            date++;
          }
          row.appendChild(cell);
        }
        calendarBody.appendChild(row);
      }
    }
    // Generate time slots
    function generateTimeSlots() {
      timeSlots.innerHTML = '';
      const slots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
      slots.forEach(slot => {
        const slotElement = document.createElement('div');
        slotElement.className = 'time-slot py-2 px-3 border border-gray-300 rounded text-center text-sm';
        slotElement.textContent = slot;
        slotElement.addEventListener('click', function() {
          const selectedSlots = document.querySelectorAll('.time-slot.selected');
          selectedSlots.forEach(slot => slot.classList.remove('selected'));
          slotElement.classList.add('selected');
          selectedTimeSlot = slot;
        });
        timeSlots.appendChild(slotElement);
      });
    }
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    prevMonthButton.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
    nextMonthButton.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
    // Custom radio buttons
    const durationRadios = document.querySelectorAll('input[name="duration"]');
    durationRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        document.querySelectorAll('.duration-radio div').forEach(indicator => {
          indicator.classList.add('hidden');
        });
        if (this.checked) {
          this.parentElement.querySelector('.duration-radio div').classList.remove('hidden');
        }
      });
    });
    // Form submission
    const consultationForm = document.getElementById('consultation-form');
    consultationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!selectedDate || !selectedTimeSlot) {
        alert('Please select a date and time for your consultation.');
        return;
      }
      alert('Consultation scheduled successfully! We will send a confirmation email shortly.');
      consultationForm.reset();
      const selectedCells = document.querySelectorAll('.custom-calendar td.selected');
      selectedCells.forEach(cell => cell.classList.remove('selected'));
      const selectedSlots = document.querySelectorAll('.time-slot.selected');
      selectedSlots.forEach(slot => slot.classList.remove('selected'));
      selectedDate = null;
      selectedTimeSlot = null;
      document.querySelector('input[name="duration"][value="30"]').checked = true;
      document.querySelectorAll('.duration-radio div').forEach(indicator => {
        indicator.classList.add('hidden');
      });
      document.querySelector('input[name="duration"][value="30"]').parentElement.querySelector('.duration-radio div').classList.remove('hidden');
    });
  }

  // Charts Script
  const recyclingChartElement = document.getElementById('recycling-chart');
  if(recyclingChartElement && typeof echarts !== 'undefined') {
    try {
      const recyclingChart = echarts.init(recyclingChartElement);
      const recyclingOption = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          textStyle: {
            color: '#1f2937'
          }
        },
        grid: {
          top: 10,
          right: 10,
          bottom: 30,
          left: 50
        },
        xAxis: {
          type: 'category',
          data: ['2020', '2021', '2022', '2023', '2024', '2025'],
          axisLine: {
            lineStyle: {
              color: '#d1d5db'
            }
          },
          axisLabel: {
            color: '#1f2937'
          }
        },
        yAxis: {
          type: 'value',
          name: 'Tons',
          nameTextStyle: {
            color: '#1f2937'
          },
          axisLine: {
            lineStyle: {
              color: '#d1d5db'
            }
          },
          axisLabel: {
            color: '#1f2937'
          },
          splitLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          }
        },
        series: [
          {
            name: 'Plastic Waste',
            type: 'line',
            smooth: true,
            data: [1200, 1800, 2500, 3800, 5200, 7500],
            itemStyle: {
              color: 'rgba(87, 181, 231, 1)'
            },
            lineStyle: {
              width: 3
            },
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(87, 181, 231, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(87, 181, 231, 0.1)'
                }
              ])
            }
          },
          {
            name: 'E-Waste',
            type: 'line',
            smooth: true,
            data: [800, 1200, 1900, 2600, 3400, 4500],
            itemStyle: {
              color: 'rgba(141, 211, 199, 1)'
            },
            lineStyle: {
              width: 3
            },
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(141, 211, 199, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(141, 211, 199, 0.1)'
                }
              ])
            }
          }
        ]
      };
      recyclingChart.setOption(recyclingOption);
      // Carbon Chart
      const carbonChartElement = document.getElementById('carbon-chart');
      if(carbonChartElement && typeof echarts !== 'undefined') {
        try {
          const carbonChart = echarts.init(carbonChartElement);
          const carbonOption = {
            animation: false,
            tooltip: {
              trigger: 'item',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              textStyle: {
                color: '#1f2937'
              }
            },
            legend: {
              bottom: '0%',
              left: 'center',
              textStyle: {
                color: '#1f2937'
              }
            },
            series: [
              {
                name: 'Carbon Reduction',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '18',
                    fontWeight: 'bold',
                    color: '#1f2937'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 45, name: 'Waste Recycling', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
                  { value: 25, name: 'Process Optimization', itemStyle: { color: 'rgba(141, 211, 199, 1)' } },
                  { value: 20, name: 'Renewable Energy', itemStyle: { color: 'rgba(251, 191, 114, 1)' } },
                  { value: 10, name: 'Other Initiatives', itemStyle: { color: 'rgba(252, 141, 98, 1)' } }
                ]
              }
            ]
          };
          carbonChart.setOption(carbonOption);
          window.addEventListener('resize', function() {
            try {
              if(recyclingChart) recyclingChart.resize();
              if(carbonChart) carbonChart.resize();
            } catch(error) {
              console.error('Error resizing charts:', error);
            }
          });
        } catch(error) {
          console.error('Error initializing charts:', error);
        }
      }
    } catch(error) {
      console.error('Error initializing charts:', error);
    }
  }

  // Update Notification Popup logic
  (function() {
    const popup = document.getElementById('update-popup');
    const closeBtn = document.getElementById('update-popup-close');
    const disableCheckbox = document.getElementById('update-popup-disable');
    // Show popup only if not disabled
    if (popup && closeBtn && disableCheckbox) {
      if (localStorage.getItem('srm_update_popup_disabled') === '1') {
        popup.style.display = 'none';
      } else {
        popup.style.display = '';
      }
      closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        // If user checked disable, store preference
        if (disableCheckbox.checked) {
          localStorage.setItem('srm_update_popup_disabled', '1');
        }
      });
      // If user checks the box, store preference and hide popup immediately
      disableCheckbox.addEventListener('change', function() {
        if (disableCheckbox.checked) {
          localStorage.setItem('srm_update_popup_disabled', '1');
          popup.style.display = 'none';
        }
      });
    }
  })();

  // User Login Modal logic
  (function() {
    const loginBtn = document.getElementById('user-login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginClose = document.getElementById('login-modal-close');
    const loginForm = document.getElementById('login-form');
    if (loginBtn && loginModal && loginClose && loginForm) {
      loginBtn.addEventListener('click', function() {
        loginModal.classList.remove('hidden');
        setTimeout(() => {
          const emailInput = document.getElementById('login-email');
          if (emailInput) emailInput.focus();
        }, 200);
      });
      loginClose.addEventListener('click', function() {
        loginModal.classList.add('hidden');
      });
      // Close modal if clicking outside the modal content
      loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
          loginModal.classList.add('hidden');
        }
      });
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Placeholder: show alert for now
        alert('Login submitted! (No backend logic yet)');
        loginModal.classList.add('hidden');
      });
    }
  })();

  // EPR Self-Help Widget Logic
  (function() {
    const btn = document.getElementById('epr-selfhelp-btn');
    const modal = document.getElementById('epr-selfhelp-modal');
    const closeBtn = document.getElementById('epr-selfhelp-close');
    const steps = [
      document.getElementById('epr-step-category'),
      document.getElementById('epr-step-type'),
      document.getElementById('epr-step-year'),
      document.getElementById('epr-step-data'),
      document.getElementById('epr-step-result')
    ];
    let userData = {
      category: '',
      type: '',
      year: '',
      purchase: 0,
      sales: 0
    };
    function showStep(idx) {
      steps.forEach((step, i) => {
        if (step) step.classList.toggle('hidden', i !== idx);
      });
    }
    if (btn && modal && closeBtn && steps.every(Boolean)) {
      // Open modal
      btn.addEventListener('click', function() {
        modal.classList.remove('hidden');
        showStep(0);
      });
      // Close modal
      closeBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
      });
      modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.add('hidden');
      });
      // Step 1: Category
      modal.querySelectorAll('.epr-category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          userData.category = btn.getAttribute('data-category');
          showStep(1);
        });
      });
      // Step 2: Type
      modal.querySelectorAll('.epr-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          userData.type = btn.getAttribute('data-type');
          showStep(2);
        });
      });
      // Step 3: Year
      const fySelect = document.getElementById('epr-fy-select');
      const fyNext = document.getElementById('epr-fy-next');
      fyNext.addEventListener('click', function() {
        userData.year = fySelect.value;
        showStep(3);
      });
      // Step 4: Data Entry
      const dataForm = document.getElementById('epr-data-form');
      dataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        userData.purchase = parseFloat(document.getElementById('epr-purchase').value) || 0;
        userData.sales = parseFloat(document.getElementById('epr-sales').value) || 0;
        // Simple estimation logic (for demo):
        // Assume EPR target is 70% of purchase for Plastic, 60% for E-Waste, 50% for Battery, 40% for Used Oil
        let targetPercent = 0.7;
        if (userData.type === 'E-Waste') targetPercent = 0.6;
        if (userData.type === 'Battery') targetPercent = 0.5;
        if (userData.type === 'Used Oil') targetPercent = 0.4;
        const target = Math.round(userData.purchase * targetPercent);
        let compliant = userData.sales >= target;
        let summary = `<div class='mb-2'><b>Category:</b> ${userData.category}</div>` +
          `<div class='mb-2'><b>EPR Type:</b> ${userData.type}</div>` +
          `<div class='mb-2'><b>Financial Year:</b> ${userData.year}</div>` +
          `<div class='mb-2'><b>Total Purchase:</b> ${userData.purchase}</div>` +
          `<div class='mb-2'><b>Total Consumption/Sales:</b> ${userData.sales}</div>` +
          `<div class='mb-2'><b>Estimated EPR Target:</b> <span class='text-primary font-bold'>${target}</span></div>`;
        summary += `<div class='mt-4 text-lg font-semibold ${compliant ? 'text-green-600' : 'text-red-600'}'>${compliant ? 'You are likely EPR compliant for this year.' : 'You may NOT be EPR compliant. Please review your data.'}</div>`;
        document.getElementById('epr-result-summary').innerHTML = summary;
        showStep(4);
      });
      // Step 5: Restart
      document.getElementById('epr-selfhelp-restart').addEventListener('click', function() {
        userData = { category: '', type: '', year: '', purchase: 0, sales: 0 };
        dataForm.reset();
        showStep(0);
      });
    }
  })();
}); 