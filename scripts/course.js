const courses = [
    {
        courseId: 'CSE 110',
        courseName: 'Introduction to Problem Solving and Programming',
        credit: 2,
        completed: true
    },
    {
        courseId: 'CSE 111',
        courseName: 'Programming with Functions',
        credit: 2,
        completed: true
    },
    {
        courseId: 'WDD 130',
        courseName: 'Web Fundamentals',
        credit: 2,
        completed: true
    },
    {
        courseId: 'WDD 131',
        courseName: 'Dynamic Web Fundamentals',
        credit: 2,
        completed: true
    },
    {
        courseId: 'CSE 210',
        courseName: 'Programming with Classes',
        credit: 2,
        completed: true
    },
    {
        courseId: 'CSE 121b',
        courseName: 'JavaScript Language',
        credit: 2,
        completed: false
    },
    {
        courseId: 'WDD 231',
        courseName: 'Front-end Web Development I',
        credit: 2,
        completed: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const courseList = document.querySelector('.course-list');
    const summary = document.getElementById('credit-summary');
    const buttons = document.querySelectorAll('.filters button');

    function displayCourses(filteredCourses) {
        courseList.innerHTML = '';
        let totalCredits = 0;

        filteredCourses.forEach(course => {
            const div = document.createElement('div');
            div.classList.add('course-card');
            if (course.completed) div.classList.add('completed');

            div.textContent = course.courseId;
            courseList.appendChild(div);

            totalCredits += course.credit;
        });

        summary.textContent = `The total credits for courses listed above is ${totalCredits}`;
    }

    // Initial display
    displayCourses(courses);

    // Filter by button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.textContent;
            if (filter === 'All') {
                displayCourses(courses);
            } else {
                const filtered = courses.filter(c => c.courseId.startsWith(filter));
                displayCourses(filtered);
            }
        });
    });
});

