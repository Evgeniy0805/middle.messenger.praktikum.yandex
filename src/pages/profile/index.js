import profile from './profile.hbs';
import './profile.scss';
import button from '../../components/button/index';
import profileItem from '../../components/profileItem/index';
import imgUrl from '../../assets/icons/iconProfile.svg'
import dataIcon from '../../assets/icons/changeDataIcon.svg';

const data = {
    src: imgUrl,
    title: 'Джеки Чан',
    dataList: [
        profileItem(
            'ПОЧТА',
            'email',
            dataIcon,
        ),
        profileItem(
            'ЛОГИН',
            'Jacky',
            dataIcon,
        ),
        profileItem(
            'ИМЯ',
            'Джеки',
            dataIcon,
        ),
        profileItem(
            'ФАМИЛИЯ',
            'Чан',
            dataIcon,
        ),
        profileItem(
            'ТЕЛЕФОН',
            '+7-777-777-77-77',
            dataIcon,
        )
    ],
    buttons: [
        button('button_profile', 'СОХРАНИТЬ'),
        button('button_profile', 'ВЫЙТИ')
    ]
};

export default profile(data);