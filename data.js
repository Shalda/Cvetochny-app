module.exports = function () {

    return {
        products: [
            {
                id: 1,
                name: "Букет Роз",
                parentCategory: 'shop',
                category: "Букеты",
                subcategory: "Букет в каркасе",
                diameter: 10,
                img: "Rose1.jpg",
                description: "Нежный букет в упаковке из дабл тюльпанов и ароматной сирени. Ножку букета украшает бант из натуральной рафии",
                price: 500,
                create_ts: "05.11.2019, 15:17:35",
            },
            {
                id: 2,
                name: "Букет Тюльпанов",
                parentCategory: 'shop',
                category: "Букеты",
                subcategory: "Последняя колекция",
                diameter: 10,
                img: "Rose2.jpg",
                description: "Нежный букет в упаковке из дабл тюльпанов и ароматной сирени. Ножку букета украшает бант из натуральной рафии",
                price: 600,
                create_ts: "05.10.2019, 15:17:35",
            },
            {
                id: 3,
                name: "Букет Ромашек",
                parentCategory: 'shop',
                category: "Букеты",
                subcategory: "Мужской букет",
                diameter: 10,
                img: "Rose3.jpg",
                description: "Нежный букет в упаковке из дабл тюльпанов и ароматной сирени. Ножку букета украшает бант из натуральной рафии",
                price: 200,
                create_ts: "05.09.2019, 15:17:35",
            },
            {
                id: 4,
                name: "51 роза в шляпной коробке",
                parentCategory: 'shop',
                category: "Композиция",
                subcategory: "Новые композиции",
                diameter: 10,
                img: "Rose1.jpg",
                description: "Букет из 51 эквадорской розы Ред Париж, которая обладает роскошным бутоном классической формы и невероятно насыщенным бордовым цветом, станет шикарным подарком для любимой девушки! ",
                price: 1000,
                create_ts: "05.08.2019, 15:17:35",
            },
            {
                id: 5,
                name: "Букет из альстромерий",
                parentCategory: 'shop',
                category: "Композиция",
                subcategory: "Новые композиции",
                diameter: 10,
                img: "Rose1.jpg",
                description: "Монобукет из разноцветных альстромерий в стильной шляпной коробке поможет поздравить с любым праздником и подарить душевное тепло, свет и любовь!",
                price: 1200,
                create_ts: "05.12.2019, 15:17:35",
            },
            {
                id: 6,
                name: "Микс полевых цветов",
                parentCategory: 'shop',
                category: "Композиция",
                subcategory: "Интерьерная композиция",
                diameter: 10,
                img: "Rose1.jpg",
                description: "Интерьерная композиция в стиле кантри из искусственных тканевых цветов высокого качества. Закреплены цветы в кашпо - пенечке из натуральной коры дуба, тонированной акриловыми красками",
                price: 200,
                create_ts: "05.12.2019, 15:17:12",
            },
            {
                id: 7,
                name: "Букет мятное утро",
                parentCategory: 'shop',
                category: "Декор",
                diameter: 10,
                img: "Rose1.jpg",
                description: "Букет с нежно-голубыми стабилизированными розами и лагурусом. Такой букет - память на долгие годы, так как он не требует ухода.",
                price: 1200,
                create_ts: "05.12.2019, 15:17:14",
            },
            {
                id: 8,
                name: "Орхидея",
                category: "Комнатные растения",
                parentCategory: 'shop',
                diameter: 10,
                img: "Rose1.jpg",
                description: "Диаметр цветочного горшка: 12 см. Высота растения: 60 см.",
                price: 250,
                create_ts: "05.12.2019, 15:14:35",
            },
            {
                id: 9,
                name: "Пуансеттия",
                parentCategory: 'shop',
                category: "Комнатные растения",
                diameter: 10,
                img: "Rose1.jpg",
                description: "Украсьте свой интерьер растениями и цветочными горшками соответствующими Вашему стилю",
                price: 300,
                create_ts: "05.12.2019, 15:14:35",
            },

            {
                id: "w1",
                name: " W Букет Роз",
                parentCategory: 'wedding',
                category: "Букет невесты",
                diameter: 10,
                img: "svadba1.jpg",
                description: "Нежный букет в упаковке из дабл тюльпанов и ароматной сирени. Ножку букета украшает бант из натуральной рафии",
                price: 500,
                create_ts: "05.12.2019, 15:17:15",
            },
            {
                id: "w2",
                name: " W Букет Тюльпанов",
                parentCategory: 'wedding',
                category: "Акссесуары",
                diameter: 10,
                img: "svadba2.jpg",
                description: "Нежный букет в упаковке из дабл тюльпанов и ароматной сирени. Ножку букета украшает бант из натуральной рафии",
                price: 600,
                create_ts: "05.12.2019, 15:17:30",
            },
            {
                id: "w3",
                name: "Букет Ромашек",
                parentCategory: 'wedding',
                category: "Свадебное оформление",
                diameter: 10,
                img: "svadba3.jpg",
                description: "Нежный букет в упаковке из дабл тюльпанов и ароматной сирени. Ножку букета украшает бант из натуральной рафии",
                price: 700,
                create_ts: "05.12.2019, 15:17:11",
            }
        ],

        visual: [
            {
                id: "v1",
                name: "Оформление фотозоны",
                parentCategory: 'oformlenie',
                category: "Фотозоны",
                description: "Фотозоны для любого торжества, учтем любые пожелания заказчика, обширное портфолио. Доставка по Харькову и области",
                price: 1000,
                create_ts: "05.12.2019, 15:10:11",
                img: ["oformlenie1.jpg", "oformlenie2.jpg", "oformlenie3.jpg"]
            },
            {
                id: "v2",
                name: "Оформление интерьеров",
                parentCategory: 'oformlenie',
                category: "Интерьеры",
                description: "Интерьеры для любого торжества, учтем любые пожелания заказчика, обширное портфолио. Доставка по Харькову и области",
                price: 2000,
                create_ts: "05.12.2019, 15:14:31",
                img: ["oformlenie4.jpg", "oformlenie5.jpg", "oformlenie6.jpg"]
            }
        ],

        orders: []
    }
};
