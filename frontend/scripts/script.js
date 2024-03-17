const newsForm = $("#addNewsForm");
const newsTitleInput = $("#title");
const newsDescriptionInput = $("#content");
const newsList = $("#newsList");

const getAllNews = () => {
    $.ajax({
        url: "http://localhost/news-website/backend/get_news.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            displayNews(data);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
};

const displayNews = (data) => {
    newsList.empty();
    $.each(data, function (index, newsItem) {
        const newsDiv = $("<div>").addClass("card mb-3");
        const cardBody = $("<div>").addClass("card-body");
        const newsTitle = $("<h5>").addClass("card-title").text(newsItem.title);
        const newsDescription = $("<p>").addClass("card-text").text(newsItem.description);

        cardBody.append(newsTitle);
        cardBody.append(newsDescription);
        newsDiv.append(cardBody);

        newsList.append(newsDiv);
    });
};

const addNews = (title, description) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    $.ajax({
        url: "http://localhost/news-website/backend/add_news.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (data) {
            getAllNews();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
};

newsForm.on("submit", function (event) {
    event.preventDefault();

    const title = newsTitleInput.val().trim();
    const description = newsDescriptionInput.val().trim();

    if (title !== "" && description !== "") {
        addNews(title, description);
        newsForm[0].reset();
    } else {
        alert("Please enter both title and description.");
    }
});

getAllNews();