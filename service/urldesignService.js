function urlDesign(str) {
    const pattern = /(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[^\s]*)?/g;
    return str.replace(pattern, '<a class="text-info" href="$&" target="_blank"><u>$&</u></a>');
}

module.exports = urlDesign