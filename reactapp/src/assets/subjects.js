var subjects = {'BD & Jeunesse': {
                    'BD, Comics' : ['subject:"Comics+%26+Graphic+Novels+/+General"', 
                                            'subject:"Comics+%26+Graphic+Novels+/+Literary"',
                                            'subject:"Comics+%26+Graphic+Novels+/+Superheroes"',
                                            'subject:"Comics+%26+Graphic+Novels+/+Nonfiction+/+General"',
                                            'subject:"Humor+/+Form+/+Comic+Strips+%26+Cartoons"'],
                    'Manga':['subject:"Comics+%26+Graphic+Novels+/+Manga+/+General"',
                             'subject:"Comics & Graphic Novels Manga Action & Adventure"',
                             'subject:"Comics+%26+Graphic+Novels+Manga+Sports"',
                             'subject:"Comics+%26+Graphic+Novels+/+Manga+/+For+boys"',
                             'subject:"Comics+%26+Graphic+Novels+/+Manga+/+For+women"',
                             'subject:"Comics+%26+Graphic+Novels+/+Manga+/+Science+Fiction"'],
                    'Humour' : ['subject:"Humor+/+Topic+/+Men,+Women+%26+Relationships"',
                                'subject:"Humor+/+Topic+/+Politics"',
                                'subject:"Humor+/+Topic+/+Religion"',
                                'subject:"Humor+/+Topic+/+History"',
                                'subject:"Humor+/+General"'],
                    'Livre jeunesse' : ['subject:"Juvenile+Fiction+/+General"',
                                        'subject:"Juvenile+Fiction+/+Readers+/+Beginner"',
                                        'subject:"Juvenile+Fiction+Action+%26+Adventure+General"',
                                        'subject:"Juvenile+Fiction+/+Social+Themes+/+Friendship"',
                                        'subject:"Juvenile+Fiction+/+Fantasy+%26+Magic"',
                                        'subject:"Juvenile+Fiction+/+School+%26+Education"',
                                        'subject:"Young+Adult+Fiction+/+Action+%26+Adventure+/+General"']
                    }, 
                'Littérature & Fiction': { 
                    'Roman' : ['subject:"Fiction+/+General"',
                               'subject%3A"FICTION+%2F+Romance+%2F+General"',
                               'subject:"Fiction+/+Classics"',
                               'subject:"Fiction+/+Literary"',
                               'subject:"Fiction+/+Action+%26+Adventure"',
                               'subject:"Fiction+/+African+American+/+General"',
                               'subject:"Fiction+/+Romance+/+Contemporary"',
                               'subject:"Fiction+/+Media+Tie-In"',
                               'subject:"Fiction+/+Historical+/+General"',
                               'subject%3A"Fiction%20%2F%20Political"',
                               'subject:"FICTION / Sagas"',],
                    'Poésie & théatre' : ['subject%3A"Poetry"','subject%3A"Drama"'],
                    'Thriller, Roman Policier' : ['subject:"Fiction+/+Thrillers+/+Suspense"',
                                                  'subject:"Fiction+/+Mystery+%26+Detective+/+General"',
                                                  'subject:"Fiction+/+Mystery+%26+Detective+/+International+Mystery+%26+Crime"',
                                                  'subject:"Fiction+/+Psychological"',
                                                  'subject%3A"FICTION+%2F+Thrillers+%2F+Crime"',
                                                  'subject%3A"FICTION+%2F+Thrillers+%2F+Political"'],
                    'Fantasy, Science Fiction' : ['subject%3A"FICTION+%2F+Science+Fiction+%2F+General"',
                                                  'subject%3A"FICTION+%2F+Science+Fiction+%2F+Action+%26+Adventure"',
                                                  'subject%3A"FICTION+%2F+Science+Fiction+%2F+Cyberpunk"',
                                                  'subject%3A"FICTION+%2F+Science+Fiction+%2F+Space+Opera"']
                    },
                'Vie Pratique':{
                    'Cuisine': ['subject%3A"COOKING+%2F+General"',
                                'subject%3A"COOKING+%2F+Baby+Food"',
                                'subject%3A"COOKING+%2F+Health+%26+Healing+%2F+General"',
                                'subject%3A"COOKING+%2F+Regional+%26+Ethnic+%2F+General"',
                                'subject%3A"COOKING+%2F+Vegetarian"',
                                'subject%3A"COOKING+%2F+Vegan"'],
                    'Self Help' : ['subject%3A"SELF-HELP+%2F+General"',
                                   'subject%3A"+SELF-HELP+%2F+Abuse"',
                                   'subject%3A"SELF-HELP+%2F+Communication+%26+Social+Skills"',
                                   'subject%3A"SELF-HELP+%2F+Creativity"',
                                   'subject%3A"SELF-HELP+%2F+Spiritual"',
                                   'subject%3A"SELF-HELP+%2F+Dreams"',
                                   'subject%3A"SELF-HELP+%2F+Fashion+%26+Style"',
                                   'subject%3A"SELF-HELP+%2F+Meditations"',
                                   'subject%3A"SELF-HELP+%2F+Personal+Growth+%2F+General"',
                                   'subject%3A"SELF-HELP+%2F+Self-Management+%2F+General"',
                                   'subject%3A"SELF-HELP+%2F+Sexual+Instruction"'], 
                    'Santé, Bien être' : ['subject%3A"HEALTH & FITNESS"','subject%3A"BODY+MIND+%26+SPIRIT"','subject%3A"FAMILY+%26+RELATIONSHIPS"'], 
                    'Loisirs Créatifs': ['subject%3A"CRAFTS+%26+HOBBIES"']
                    }, 
                'Art, Culture & Société':{
                    'Actualités Politique, Economie, Société' : ['subject%3A"BUSINESS+%26+ECONOMICS"','subject%3A"POLITICAL+SCIENCE"','subject;"SOCIAL+SCIENCE"'], 
                    'Art, Cinema, Musique': ['subject%3A"ART"','subject%3A"PERFORMING+ARTS"','subject%3A"PHOTOGRAPHY"','subject%3A"MUSIC"'],
                    'Biographie, Autobiographie' : ['subject%3A"BIOGRAPHY+%26+AUTOBIOGRAPHY"'],
                    'Histoire' : ['subject%3A"HISTORY"'],
                    'Religion & Spiritualité' : ['subject%3A"RELIGION"'],
                    'Sciences Humaines' : ['subject%3A"SOCIAL SCIENCE"','subject%3A"PSYCHOLOGY"','subject%3A"PHILOSOPHY"']
                    }, 
                'Nature & Loisirs':{
                    'Nature, Animaux, Jardin' : ['subject%3A"NATURE"','subject%3A"PETS"','subject%3A"GARDENING"'],
                    'Sport, Loisirs, Transport': ['subject%3A"SPORTS+%26+RECREATION"','subject%3A"TRANSPORTATION"'],
                    'Tourisme & Voyage' : ['subject%3A"TRAVEL"'],
                    }, 
                'Savoirs':{
                    'Droit' : ['subject%3A"Law"'], 
                    'Entreprise, Management' : ['subject%3A"BUSINESS+%26+ECONOMICS+%2F+General"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Accounting+%2F+Managerial"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Business+Ethics"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Business+Communication+%2F+General"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Careers+%2F+General"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Consulting"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Decision-Making+%26+Problem+Solving"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Development+%2F+General"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+E-Commerce"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Economics+%2F+General"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Industrial+Management"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Management"',
                                                'subject%3A"BUSINESS+%26+ECONOMICS+%2F+Strategic+Planning"'],
                    'Livres informatique' : ['subject%3A"Computers"'],
                    'Science & Médecine' : ['subject%3A"Science"','subject%3A"Medical"']
                }};

export default subjects;