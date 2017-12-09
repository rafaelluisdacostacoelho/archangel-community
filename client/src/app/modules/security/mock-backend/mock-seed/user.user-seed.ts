import { IUserModel, UserModel } from '../../models/user.model';

export let UserSeed: IUserModel[] = [
    new UserModel(1, 'rafael.coelho', 'femto', 'Rafael', 'Luis da Costa', 'Coelho', new Date(1988, 9, 13)),
    new UserModel(2, 'kristina.svechinskaya', 'beauty', 'Kristina', 'Vladimirovna', 'Svechinskaya', new Date(1989, 2, 16)),
    new UserModel(3, 'kevin.mitnick', 'shimomura', 'Kevin', 'David ', 'Mitnick', new Date(1963, 8, 5)),
    new UserModel(4, 'jonathan.james', 'first', 'Jonathan', 'Joseph', 'James', new Date(1983, 12, 12)),
    new UserModel(5, 'steve.wozniak', 'apple', 'Steve', 'Gary', 'Wozniak', new Date(1950, 8, 11)),
    new UserModel(6, 'robert.morris', 'worm', 'Robert', 'Tappan', 'Morris', new Date(1965, 11, 8))
];
