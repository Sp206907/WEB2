const blogForm = document.getElementById('blogForm');
const postsContainer = document.getElementById('postsContainer');

// 1. Функция получения всех постов
async function fetchBlogs() {
    const response = await fetch('/blogs');
    const blogs = await response.json();
    
    postsContainer.innerHTML = ''; // Очищаем контейнер
    
    blogs.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <h3>${blog.title}</h3>
            <p class="meta">Автор: ${blog.author} | ${new Date(blog.createdAt).toLocaleString()}</p>
            <p>${blog.body}</p>
            <button class="delete-btn" onclick="deleteBlog('${blog._id}')">Удалить</button>
        `;
        postsContainer.appendChild(card);
    });
}

// 2. Функция создания поста
blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newBlog = {
        title: document.getElementById('title').value,
        body: document.getElementById('body').value,
        author: document.getElementById('author').value || undefined 
    };

    const response = await fetch('/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
    });

    if (response.ok) {
        blogForm.reset();
        fetchBlogs(); // Обновляем список
    }
});

// 3. Функция удаления
async function deleteBlog(id) {
    if (confirm('Удалить этот пост?')) {
        await fetch(`/blogs/${id}`, { method: 'DELETE' });
        fetchBlogs();
    }
}

// Загружаем посты при открытии страницы
fetchBlogs();