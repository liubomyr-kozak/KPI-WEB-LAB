const formatUserCard = (user) => ({
  picture: user.picture.large,
  location: `${user.location.postcode} ${user.location.country}, ${user.location.city}, ${user.location.street.name} ${user.location.street.number}`,
  city: user.location.city,
  postcode: user.location.postcode,
  email: user.email,
})

const fetchUsers = ({ limit, page }) => {
  return fetch(`https://randomuser.me/api?results=${limit}`)
    .then((resp) => resp.json())
    .then(users => {
      return {
        meta: users.info,
        list: users.results.map(formatUserCard)
      }
    })
}


const renderUsers = (users) => {
  const resultNode = document.querySelector('.loadResult')

  resultNode.innerHTML = ''

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList = 'card';

    for (const [props, value] of Object.entries(user)) {

      let subItem
      subItem = document.createElement('div');

      if (props === 'picture') {
        subItem.classList = `card__${props}`;
        const img = document.createElement('img');
        img.src = value;
        subItem.appendChild(img);
      } else {
        subItem.classList = `card__content`;
        subItem.innerText = value;
      }

      card.appendChild(subItem);
    }


    resultNode.appendChild(card);
  })
}

const paginator = {
  page: 1,
  limit: 5
}

document
  .querySelector('.loadBtn button')
  .addEventListener('click', (e) => {
    e.target.disabled = true;
    paginator.page += 1;

    fetchUsers(paginator).then(users => {
      e.target.disabled = false;

      renderUsers(users.list)
    })
  })
