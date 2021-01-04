const createdAt = document.getElementsByClassName("video__createdAt");

const timeCalc = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const minutes = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 minute ago";
  if (minutes < 60 && minutes !== 1) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours === 1) {
    return "1 hour ago";
  }
  if (hours < 24 && hours !== 1) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(minutes / 60 / 24);
  if (days === 1) {
    return "1 day ago";
  }
  if (days < 365) {
    return `${days} days ago`;
  }

  const betweenTimeYear = Math.floor(days / 365);
  if (betweenTimeYear === 1) {
    return "1 year ago";
  }
  return `${Math.floor(days / 365)} years ago`;
};

// eslint-disable-next-line no-plusplus
for (let i = 0; i < createdAt.length; i++) {
  const createdAtTime = createdAt[i].innerHTML;
  const postedAt = timeCalc(createdAtTime);
  createdAt[i].innerHTML = postedAt;
}
