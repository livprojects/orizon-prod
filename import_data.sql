BEGIN;
-- -----------------------------------------------------
-- USER
-- -----------------------------------------------------
INSERT INTO "user"("username", "lastname", "firstname", "email", "password", "birthday", "role") OVERRIDING SYSTEM VALUE VALUES
('sam', 'lorti', 'sam', 'sam@yahoo.fr', '1234', '1986-07-03', 'user'),
('Elsa', 'beltra', 'sasa', 'sasav@yahoo.fr', '5678', '1989-12-06', 'user'),
('Michel', 'Laporte', 'Michel', 'michel@sfr.fr', '1234', '1999-02-26', 'user'),
('John', 'Doe', 'Johnnt', 'john@sfr.fr', '1234', '197-02-28', 'user');

-- -----------------------------------------------------
-- PLANET
-- -----------------------------------------------------
INSERT INTO "planet"("name", "description", "position", "is_planet", "surface", "mass", "volume", "gravity", "temp_max", "temp_average", "temp_min", "sidereal_orbit", "sidereal_rotation", "rotation_speed", "discovered_by", "discovery_date", "geopolitics_info", "pollution_info", "picture_link") OVERRIDING SYSTEM VALUE VALUES
('Lune', 'Corps céleste qui se serait formé il y a environ 4,51 milliards d''années, la Lune est le seul satellite naturel de la Terre. Elle lui montre toujours la même face, d''où l''expression "face cachée de la Lune". Ce côté obscur intéresse d''ailleurs certains pays dans le cadre de la conquête spatiale. Un rover chinois, Yutu 2, s''y est d''ailleurs posé le 3 janvier 2019, près de cinquante ans après les premiers pas de l''Homme sur la Lune le 21 juillet 1969.

La Lune a non seulement une forte influence sur l''imaginaire humain et dans de nombreuses cultures, mais aussi très concrètement sur des mécanismes géologiques terrestres; l''action combinée de la Lune et du Soleil réagit notamment le mécanisme des marées.

 Fait curieux, la Lune s''éloigne de nous, d''une distance moyenne de 3,8 centimètres, ce qui fait qu''à sa création elle devait se trouver entre 15 et 20 fois plus proche de la Terre. 
- Source: NASA, Cité de l''espace, Wikipédia', 3, FALSE, 37936695, 7347730924573500000000, 21971669064, 1624, 123, -23, -233, 27, 27, 3684, 'les humains dans l''Antiquité', '0001-01-01', 'A qui appartient la Lune ? La question était restée en suspens plusieurs décennies, faute de présence humaine. Pourtant la reprise de l''exploration de notre satellite remet le Monopoly lunaire au goût du jour. Si un traité sur la Lune signé en 1979 stipule que tout corps céleste appartient à la communauté internationale, il n''a été ratifié que par une quinzaine de pays  - et ni par la France, la Russie ou les Etats-Unis -. 

 Dans ses accords Artemis présentés en mai 2020, la Nasa reprend les principes du traité de l''espace de 1967: coopération entre les nations, assistance mutuelle, partage des données scientifiques, etc. Cependant, deux points diffèrent: la Nasa évoque la  création de ''zones de sécurité'' et semble opter pour une appropriation des ressources - notamment l''eau - par ceux qui les exploiteront. 

 Même si les deux pays collaborent déjà sur le plan spatial, la Russie s''est élevée ''contre la privatisation de la Lune''. Plusieurs pays de l''agence spatiale européenne ont déjà signé ces accords Artemis, mais la France n''a pour le moment pas encore pris position. 
- Source: Le Monde, Wikipédia, NASA, divers
', 'À quand une écologie dans l''espace ? La question de l''écologie ne se pose visiblement pas que sur Terre puisque la pollution spatiale est l''une des principales problématiques depuis quelques années. Selon l''Agence spatiale européenne, il y a eu plus de débris spatiaux en orbite que de satellites opérationnels depuis le début de l''ère spatiale et leur nombre tend à augmenter.
La cause principale : l''explosion en orbite provoquée par les restes d''énergie - carburant et batterie - lors des lancements. Au vu du nombre de débris de satellites en orbite cependant - actuellement estimés à plus de 5400 objets de plus de 1m et 34 000 de plus de 10 cm -, les collisions risquent d''augmenter avec, représentant également un danger pour les activités spatiales et les astronautes en orbite.
 Si les Etats-Unis ont mis enfin à jour leurs règles sur les débris et se positionnent dans leurs accords Artemis pour diminuer cette pollution, l''ESA compte lancer une mission de nettoyage de l''espace à l''horizon 2025 avec la mission Space19+, dont le principe est de désorbiter les objets et de pouvoir ainsi les récupérer. Au printemps 2020, le président américain a toutefois évoqué la possibilité d''exploiter, récupérer et commercialiser des ressources lunaires jusque-là préservées par un flou juridique international. Un peu paradoxale avec la lutte contre la pollution évoquée dans les accords Artemis, cette exploitation minière pose la question d''éventuels nouveaux déchets et émanations à la surface de la Lune.
- Source: Numerama, Wikipedia, Sciences et Vie, NASA, divers', 'https://www.nasa.gov/sites/default/files/thumbnails/image/edu_srch_amazing_space_the_moon_0.png');


-- -----------------------------------------------------
-- MISSION
-- -----------------------------------------------------

INSERT INTO "mission"("mission_name", "program_name", "launch_date", "planet_geoloc", "mission_goal", "human_mission", "mission_type", "return_flight", "picture_link") OVERRIDING SYSTEM VALUE VALUES
(
'Chang''e 5', 
'Chang''e', 
'2020-11-24', 
'41-45° N, 49-69° W', 
'Chang''e 5 ou CE-5 est une mission chinoise de retour d''échantillons du sol lunaire dont la date de lancement est planifiée fin 2020. La sonde spatiale doit ramener sur Terre un échantillon du sol lunaire d''une masse pouvant atteindre deux kilogrammes. L''atterrisseur, qui doit se poser sur le sol lunaire près du Mons Rümker dans l''océan des Tempêtes, dispose de plusieurs instruments. Il s''agit de la première mission de retour d''échantillons de sol lunaire depuis la mission soviétique Luna 24 qui a eu lieu en 1976.', 
FALSE, 
'institutional', 
TRUE, 
'change5.jpg'
),
(
'Luna 25', 
'Luna', 
'2020-01-01', 
'69,545° Nord, 43,544° Est', 
'Luna 25 ou Atterrisseur Luna-Glob (russe Луна-Глоб qui signifie globe lunaire) est une mission spatiale russe d''exploration de la Lune de type atterrisseur qui doit être lancée par une fusée Soyouz-Fregat en 2021. Luna-Glob est la première sonde spatiale lunaire lancée par l''astronautique russe depuis 1976. 
Les objectifs scientifiques de la mission Luna 25 sont les suivants :
déterminer les propriétés thermiques et mécaniques du régolithe dans les régions polaires ;
mesurer les caractéristiques infrarouge du régolithe polaire ;
effectuer des mesures de spectroscopie par claquage laser du régolithe polaire ;
déterminer le contenu en eau et la proportion des éléments chimiques présents dans le sol proche de la surface du régolithe polaire ;
déterminer les caractéristiques du plasma et de l''exosphère neutre au pôle ;
mesurer la présence de poussière au pôle ;
mesurer les variations thermiques du régolithe polaire.
Sur le plan technologique, les objectifs de la mission sont :
valider la technique d''atterrissage en douceur ;
tester le fonctionnement des communications radio entre les régions polaires de la Lune et la Terre ;
valider le comportement thermique de l''atterrisseur ;
tester et valider le fonctionnement du bras télécommandé.
', 
FALSE, 
'institutional', 
FALSE, 
'luna25.jpg'),
(
'Chandrayaan 3', 
'Chandrayaan', 
'2021-03-01', 
'Près du pôle sud', 
'Chandrayaan-3 est une sonde spatiale de l''agence spatiale indienne, l''ISRO, dont l''objectif est de recueillir des données scientifiques sur la Lune. Elle comprend un atterrisseur et un petit astromobile qui doit se poser sur la Lune. Le lancement de la mission, dont le développement a été décidé à la suite de l''échec en août 2019 d''une mission similaire, est prévu pour mars 2021.', 
FALSE, 
'institutional', 
FALSE, 
'chandrayaan3.jpg'
),
(
'Artemis 1', 
'Artemis', 
'2021-07-01', 
'Trajectoire circumlunaire', 
'L''objectif principal est de valider le fonctionnement du nouveau lanceur Space Launch System ainsi que celui du vaisseau Orion sans équipage. Ce dernier sera testé durant les différentes phases d''une mission autour de la Lune : insertion en orbite autour de celle-ci, modification de l''orbite, injection sur une orbite de retour vers la Terre, rentrée atmosphérique à grande vitesse.
Le lancement est prévu pour 2021 et aura lieu au complexe de lancement 39 du centre spatial Kennedy. Le vaisseau Orion effectuera un aller-retour Terre-Lune en suivant une trajectoire similaire à celle de la mission Apollo 8. Le vaisseau partira directement vers la Lune puis survolera sa face cachée à environ 150 km d''altitude. Il sera alors injecté sur une orbite rétrograde distante autour de la Lune qu''il parcourra pendant six jours. Ensuite, après un second passage à basse altitude au-dessus de la Lune, il sera réinjecté vers la Terre puis effectuera une rentrée atmosphérique à haute vitesse (environ 11 km/s) pour ensuite amerrir dans l''océan Pacifique.', 
FALSE, 
'institutional', 
TRUE, 
'artemis1.jpg'
),
(
'CAPSTONE', 
'Artemis', 
'2021-01-01', 
'Orbite de la lune', 
'CAPSTONE est un nano-satellite de type CubeSat 12U de la NASA dont l''objectif est de vérifier la stabilité de l''orbite prévue pour la future station spatiale Lunar Gateway conçue dans le cadre du Programme Artemis ainsi que l''usage de technologie de positionnement autonome. L''engin spatial d''une masse de 25 kg doit être lancé en 2021 par une fusée Electron et se placer 3 mois plus tard en orbite autour de la Lune pour une durée opérationnelle totale de 9 mois.
La mission doit répondre à plusieurs objectifs:
Vérifier les caractéristiques de l''orbite quasi-rectiligne de halo autour de la Lune pour de futurs engins spatiaux, en particulier la future Lunar Gateway.
Démontrer la méthode pour entrer dans cette orbite et la maintenir, ce qui doit permettre à terme des aller-retour avec la surface de la Lune.
Démontrer le système de navigation grâce à la communication entre engins spatiaux afin de déterminer avec précision leur position relativement à la Lune sans dépendre exclusivement du suivi depuis le sol. Le but est de plus tard permettre aux stations au sol de se concentrer sur le transfert des données scientifiques plutôt que de devoir régulièrement calculer la position des engins autour de la Lune.
Permettre à terme l''utilisation de vaisseaux commerciaux en soutien des opérations lunaires.
Obtenir de l''expérience avec le lancement et l''opération de CubeSat au-delà de l''orbite de la Terre, dans l''environnement lunaire et au-delà.
', 
FALSE, 
'institutional', 
FALSE, 
'capstone.jpg'
),
(
'SLIM', 
'SLIM', 
'2022-01-02', 
'-15,2, 35,5 (Mare Nectaris)', 
'L''objectif principal de la mission est de mettre en œuvre une méthode précise d''atterrissage sur la Lune, en l''occurrence à moins de 100 mètres du point visé. Le but est de permettre par la suite de viser des régions plus difficiles d''accès avec un fort intérêt scientifique, plutôt que des régions où il est aisé de se poser mais avec un potentiel scientifique moindre. SLIM est également un atterrisseur lunaire de faible dimension voué à démontrer la viabilité de cette architecture pour de futures sondes, notamment lors de mission de retour d''échantillons lunaires.
Les objectifs scientifiques de la mission se concentrent autour de l''origine et du mécanisme de formation de la Lune. Dans ce but, elle doit utiliser sa capacité d''atterrissage de précision pour se poser dans Mare Nectaris, une des mers lunaires présente sur la face visible, à la recherche de roches originaires du manteau lunaire excavées par des impacts de météorites. L''objectif est notamment de trouver des minéraux d''olivine, un marqueur des roches formées dans le manteau, afin de les comparer avec leurs homologues terrestres. Cela doit permettre d''étudier les théories sur le processus de formation de la Lune, notamment celle de l''impact géant. En cela la mission s''appuie sur les résultats de la précédente mission lunaire japonaise SELENE qui identifia plusieurs sites prometteurs.', 
FALSE, 
'institutional', 
FALSE, 
'slim.jpg'
),
(
'KPLO - Korea Pathfinder Lunar Orbiter', 
'Programme Spatial de la Corée du Sud', 
'2022-01-01', 
'Orbite polaire', 
'Le Korea Pathfinder Lunar Orbiter (en français « Orbiteur lunaire de reconnaissance coréen »), en abrégé KPLO, est un projet de mission lunaire développé par l''Institut coréen de recherche aérospatiale (l''agence spatiale sud-coréenne) qui doit être lancé en 2022. L''objectif de cette première mission d''exploration du système solaire de ce pays est d''acquérir la maitrise des technologies nécessaires et d''effectuer des investigations scientifiques sur la topographie et les ressources de la Lune.
Les objectifs de la mission sont :
développer la maitrise des technologies spatiales nécessaires à une mission d''exploration du système solaire ; plateforme, opération d''insertion en orbite, poursuite, communication, navigation. Créer une station de réception pouvant capter les communications des sondes spatiales dans le système solaire ;
sur le plan scientifique, les objectifs portent sur la topographie lunaire, la caractérisation de l''environnement lunaire et l''identification des ressources ;
faire une démonstration de l''Internet interplanétaire et valider cette technologie.
KPLO est un satellite de forme cubique de 678 kg, haut d''environ 2,3 mètres pour un diamètre d''environ 1,4 mètre. Les panneaux solaires, une fois déployés portent l''envergure à 7,5 mètres. Leur orientation peut être modifiée avec deux degrés de liberté et ils fournissent 760 watts. Le satellite dispose d''une antenne parabolique grand gain qui peut être orientée avec deux degrés de liberté. La liaison descendante permet de transférer 8 192 kilobits/s en bande S et 5 mégabits/s en bande X. Les corrections de trajectoire sont prises en charge par 4 moteurs-fusées de 30 newtons de poussée. Les corrections d''orientation sont réalisées avec 4 moteurs-fusées de 5 newtons de poussée.', 
FALSE, 
'institutional', 
FALSE, 
'kplo.jpg'
),
(
'Chang''e 6', 
'Chang''e', 
'2023-12-01', 
'pôle sud lunaire ou face cachée', 
'Chang''e 6, Chang''E 6 ou CE-6 est la deuxième mission chinoise de retour d''échantillon du sol lunaire. Clone de Chang''e 5 dont le lancement est planifié fin 2020, Chang''e 6 devrait être lancé vers 2023/2024. La sonde spatiale doit ramener sur Terre un échantillon du sol lunaire d''une masse pouvant atteindre deux kilogrammes. L''atterrisseur pourrait se poser dans la région du pôle sud lunaire ou sur la face cachée de la Lune. Si cet objectif est retenu ce serait le premier échantillon de sol de cette face qui serait retournée sur Terre, les missions Apollo et Luna ayant toujours ramené des échantillons en provenance de la face visible de la Lune.
Chang''e 6 fait partie du programme chinois d''exploration lunaire Chang''e. La mission fait suite aux orbiteurs Chang''e 1 (lancement en 2007) et 2 (2010) et les rovers Chang''e 3 (2013) et 4 (2018) ainsi que la mission Chang''e 5.
', 
FALSE, 
'institutional', 
TRUE, 
'change6.jpg'
),
(
'Artemis 2', 
'Artemis', 
'2023-08-01', 
'Orbite lunaire', 
'Artemis II (anciennement Exploration Mission 2 ou EM-2) est la deuxième mission du programme Artemis programmé par l''agence spatiale américaine, la NASA, dont l''objectif final est de ramener l''homme sur la Lune d''ici 2024. La mission doit amener un équipage de quatre astronautes américains jusqu''à l''orbite lunaire avant de revenir sur Terre. L''objectif est de tester le fonctionnement du vaisseau spatial Orion qui sera mis en orbite par le lanceur lourd Space Launch System. Ce premier vol avec équipage est prévu vers août 2023. Au cours de cette mission, le vaisseau Orion accomplira une trajectoire circumlunaire (autour de la Lune comme la mission Apollo 8). Ce sera ainsi la première mission avec équipage lancée vers la Lune depuis Apollo 17 en décembre 1972 soit il y a plus de 50 ans.
La mission doit être suivie par Artemis III dont l''objectif est de déposer deux astronautes à la surface de la Lune en 2024.', 
TRUE, 
'institutional', 
TRUE, 
'artemis2.jpg'
),
(
'VIPER', 
'Artemis', 
'2023-12-01', 
'Pôle sud', 
'VIPER (Volatiles Investigating Polar Exploration Rover) est un astromobile (rover) développé par l''agence spatiale américaine, la NASA, dans le but d''étudier la glace d''eau présente dans le régolithe du fond des cratères situés au pôle sud de la Lune. L''eau pourrait jouer un rôle important pour les séjours à la surface de la Lune d''équipage d''astronautes en fournissant les consommables nécessaires - oxygène, eau consommable et ergols - grâce aux technologies d''utilisation des ressources in situ. L''engin spatial, qui doit être lancé fin 2023, fait partie des missions développées dans le cadre du Programme Artemis dont l''objectif est de déposer un équipage à la surface de la Lune en 2024. L''astromobile est développé par le centre de recherches Ames de la NASA et doit être déposé sur le sol lunaire par un atterrisseur développé par la société Astrobiotics Technology.', 
FALSE, 
'institutional', 
FALSE, 
'viper.jpg'
),
(
'LUPEX', 
'Chandrayaan', 
'2024-01-01', 
'Pôle sud', 
'LUPEX (Lunar Polar Exploration Mission) est une mission robotique lunaire conçue par l’Organisation de Recherche Spatiale Indienne (ISRO) et l’Agence Aérospatiale Japonaise (JAXA). Elle consisterait à envoyer un rover lunaire et un alunisseur pour explorer le pôle sud de la Lune en 2024. JAXA est susceptible de fournir le lanceur H3 en cours de développement et le rover, alors que l’ISRO serait responsable de l’alunisseur. 
Le planning et le financement de la mission n’ont pas encore été officiellement proposés.
En Novembre 2019, l’ISRO a déclaré qu’un alunisseur était à l’étude pour la mission Chandrayaan-3 prévue en novembre 2020. Cette mission aurait pour objectif de démontrer que l’alunisseur de l’ISRO avait les capacités pour le partenariat prévu avec le Japon en 2024.', 
FALSE, 
'institutional', 
FALSE, 
'lupex.jpg'
),
(
'Artemis 3', 
'Artemis', 
'2024-01-01', 
'Pôle sud', 
'Artemis III (anciennement Exploration Mission 3 ou EM-3) est une mission spatiale avec équipage qui doit se dérouler en 2024 et qui fait partie du programme Artemis développé par l''agence spatiale américaine, la NASA, dont l''objectif est de ramener l''homme sur la Lune. Artemis III est le troisième vol du vaisseau Orion et la première mission du programme Artemis qui déposera un équipage à la surface de la Lune. L''équipage comprend quatre astronautes dont deux doivent descendre à la surface de la Lune à bord du vaisseau lunaire HLS pour y séjourner 6 jours et demi. Cette mission est la première d''une série dont l''objectif est d''effectuer des séjours de longue durée à la surface de la Lune pour étudier celle-ci et mettre au point les techniques nécessaires à des missions habitées à la surface de Mars.
Le site d''atterrissage de la mission est situé près du pôle sud de la Lune car les réserves de glace d''eau qu''on y trouve au fond des cratères situés en permanence à l''ombre peuvent être exploitées pour optimiser les séjours de longue durée : fourniture d''oxygène, d''eau consommable et d''ergols pour la propulsion. La Terre comme le Soleil étant très bas sur l''horizon au niveau du pôle sud, les communications avec la Terre devront être relayées par la station spatiale lunaire.', 
TRUE, 
'institutional', 
TRUE, 
'artemis3.jpg'
),
(
'Luna 26', 
'Luna', 
'2024-01-01', 
'Orbite de la lune', 
'Luna 26, ou l''orbiteur Luna Resours, est une mission spatiale d''exploration de la Lune étudiée par la Roscosmos (l''agence spatiale russe). Luna 26, qui doit être lancée vers 2024, est un orbiteur qui doit cartographier les sites d''atterrissage des missions ultérieures et étudier l''environnement immédiat de la Lune.
Les objectifs de la mission Luna 26 sont les suivants :
cartographier des sites d''atterrissage dans le bassin Pôle Sud-Aitken pour la mission Luna 27 ;
analyser le rayonnement dans différentes longueurs d''onde dont le rayonnement gamma ;
mesurer le flux de neutrons et le plasma spatial dans la région de la Lune ;
Tester les liaisons radio en UHF avec les sites situés à la surface de la Lune dans les régions polaires.', 
FALSE, 
'institutional', 
FALSE, 
'luna26.jpg'
),
(
'Luna 27', 
'Luna', 
'2025-01-01', 
'bassin Pôle Sud-Aitken', 
'Luna 27 ou atterrisseur Luna-Resours est une mission spatiale d''exploration de la Lune développée par l''Agence spatiale fédérale russe (Roscosmos) avec une participation notable de l''Agence spatiale européenne (ESA). L''objectif de la mission est de poser un atterrisseur au bassin Pôle Sud-Aitken, une région inexplorée de la Lune et d''étudier sur place la composition de la surface et de carottes du terrain prélevées à l''aide d''une foreuse. Le lancement est prévu vers 2025 et la mission a une durée prévue de 1 an.
Sur le plan scientifique la mission Luna-Resours doit :
déterminer les propriétés thermiques et mécaniques du régolithe des régions polaires prélevé jusqu''à une profondeur de 2 mètres ;
déterminer le contenu en eau et la proportion des éléments chimiques présents dans le sol proche de la surface du régolithe polaire ;
mesurer les caractéristiques du régolithe polaire ;
déterminer les caractéristiques du plasma et de l''exosphère neutre dans les régions polaires ;
mesurer les caractéristiques de poussière dans les régions polaires ;
effectuer des mesures des séismes en fournissant avec une grande précision leur source.
Sur le plan technique la mission doit valider :
une technique d''atterrissage de haute précision permettant d''éviter les obstacles au sol ;
les liaisons radio en UHF entre les régions polaires en surface et l''orbite lunaire ;
une foreuse capable de préserver la température des carottes de terrain prélevées.', 
FALSE, 
'institutional', 
FALSE, 
'luna27.jpg'
),
(
'EL3', 
'EL3', 
'2027-01-01', 
'unknown', 
'L''Europe jouera bien un rôle dans le mouvement de conquête de la Lune ou d''exploration durable de la Lune. Face aux ambitions américaines, chinoises, indiennes et même émiraties, il ne pouvait en être autrement. L''Agence spatiale européenne (ESA) vient en effet de confier à Airbus le développement d''un concept d''un alunisseur multi-rôle capable de transporter jusqu''à 1,7 tonne de fret vers n''importe quel endroit de la surface lunaire. Les vols de l''alunisseur EL3 devraient commencer à la fin des années 2020, avec une cadence de missions s’étalant au cours de la décennie suivante et au-delà. "EL3 sera conçu comme une capacité européenne pour des missions logistiques de surface lunaire et totalement indépendante, incluant un accès à l’espace pour l’Europe grâce à Ariane 6. L''ESA prévoit de mener trois à cinq missions EL3 sur une période d’au moins dix ans", souligne l''Agence spatiale européenne.', 
FALSE, 
'institutional', 
FALSE, 
'el3.jpg'
),
(
'LUNA 28', 
'LUNA', 
'2027-01-01', 
'unknown', 
'Luna 28 ou Luna-Grunt est une mission spatiale d''exploration de la Lune étudiée par l''Agence spatiale fédérale russe (Roscosmos). L''objectif de la mission est de ramener un échantillon du sol lunaire. Le projet fait partie d''une stratégie d''exploration de la Lune mise au point progressivement dans les années 2000 par l''Institut de recherche spatiale de l''Académie des sciences de Russie et Roscosmos. Celle-ci prévoit le lancement de plusieurs sondes spatiales de complexité croissante. Selon ces plans, Luna 28 doit être lancée en 2027.
L''envoi d''un astromobile sur le sol lunaire (mission Luna 29) est prévu à une date ultérieure non précisée.', 
FALSE, 
'institutional', 
TRUE, 
'luna28.jpg'
),
(
'EL3', 
'EL3', 
'2029-01-01', 
'unknown', 
'L''Europe jouera bien un rôle dans le mouvement de conquête de la Lune ou d''exploration durable de la Lune. Face aux ambitions américaines, chinoises, indiennes et même émiraties, il ne pouvait en être autrement. L''Agence spatiale européenne (ESA) vient en effet de confier à Airbus le développement d''un concept d''un alunisseur multi-rôle capable de transporter jusqu''à 1,7 tonne de fret vers n''importe quel endroit de la surface lunaire. Les vols de l''alunisseur EL3 devraient commencer à la fin des années 2020, avec une cadence de missions s’étalant au cours de la décennie suivante et au-delà. "EL3 sera conçu comme une capacité européenne pour des missions logistiques de surface lunaire et totalement indépendante, incluant un accès à l’espace pour l’Europe grâce à Ariane 6. L''ESA prévoit de mener trois à cinq missions EL3 sur une période d’au moins dix ans", souligne l''Agence spatiale européenne.',
FALSE, 
'institutional', 
FALSE, 
'el3.jpg'
);

-- -----------------------------------------------------
-- INSTITUTION
-- -----------------------------------------------------

INSERT INTO "institution"("name") OVERRIDING SYSTEM VALUE VALUES
('Agence spatiale européenne - ESA'),
('Agence spatiale américaine - NASA'),
('Administration spatiale nationale chinoise - CNSA'),
('Organisation indienne pour la recherche spatiale - ISRO'),
('Agence d''exploration aérospatiale japonaise - JAXA'),
('Agence spatiale russe - ROSCOSMOS'),
('Institut coréen de recherche spatiale - KARI');
-- -----------------------------------------------------
-- LEVEL
-- -----------------------------------------------------

INSERT INTO "level"("name") OVERRIDING SYSTEM VALUE VALUES
('Moussaillon'),
('Astronaute'),
('Capitaine');

-- -----------------------------------------------------
-- QUIZ
-- -----------------------------------------------------

INSERT INTO "quiz"("title", "description", "nbr_of_questions", "id_level", "id_user", "id_planet") OVERRIDING SYSTEM VALUE VALUES
('Lune à l''horizon !', 'Ce quiz de niveau 1 te permet de tester tes connaissances sur la Lune et les différentes missions prévues sur notre satellite naturel ces prochaines années.', 8, 1, 2, 1),
('Les mystères de la Lune', 'Ce quiz de niveau 2 poursuit l''exploration de la Lune mais te demande d''explorer plus en détails les missions prévues et leurs objectifs. Attention, parfois plusieurs réponses sont possibles !', 8, 2, 1, 1);

-- -----------------------------------------------------
-- QUESTION
-- -----------------------------------------------------

INSERT INTO "question"("title", "wiki") OVERRIDING SYSTEM VALUE VALUES
('Quand les humains ont-ils marché pour la première fois sur la Lune ?', 'Infos complémentaires'),
('Quel est le nom de la mission américaine prévue en 2024 ?', 'Infos complémentaires'),
('Quelle est la température moyenne sur la Lune ?', 'Infos complémentaires'),
('Quel pays listé ci-dessous n’a pas de programme spatial à destination de la lune ?', 'Infos complémentaires'),
('Quel est l’autre nom de la mission Luna 28 ?', 'Infos complémentaires'),
('Est-ce que la Lune est un satellite ?', 'Infos complémentaires'),
('En quelle année la Lune aurait-elle été formée ?', 'Infos complémentaires'),
('Parmi ces propositions, laquelle représente l’influence de la Lune sur la Terre :', 'Infos complémentaires'),
('En quelle année des humains devraient-ils à nouveau refouler le sol de la Lune ?', 'Infos complémentaires'),
('A quelle distance estime-t-on que la Lune se trouvait de la Terre à sa création, par rapport à aujourd’hui ? ', 'Infos complémentaires'),
('Que signifie ESA ?', 'Infos complémentaires'),
('Y a -t-il de l’eau sur la Lune ?', 'Infos complémentaires'),
('Parmi ces objectifs, quels sont ceux qui ne sont pas prévus par la mission chinoise Chang’e 6 prévue vers 2023/2024 ?', 'Infos complémentaires'),
('Parmi ces missions, lesquelles n’ont pas vocation à revenir sur Terre ?', 'Infos complémentaires'),
('Quel est l’objectif de la mission indienne Chandrayaan 3 ?', 'Infos complémentaires'),
('Est-ce que la Lune est ronde ?', 'Infos complémentaires');

-- -----------------------------------------------------
-- PROPOSITION
-- -----------------------------------------------------

INSERT INTO "proposition"("description") OVERRIDING SYSTEM VALUE VALUES
('Le 13 décembre 1989'),
('Le 12 juin 1958'),
('Le 21 juillet 1969'),
('Le 18 septembre 1973'),
('Nemesis 4'),
('Artemis 3'),
('Aphrodite 1'),
('Demeter 2'),
('15 degrés celsius'),
('-23 degrés celsius'),
('-81 degrés celsius'),
('29 degrés celsius'),
('Inde'),
('Russie'),
('Guatemala'),
('Japon'),
('Luna grunt'),
('Luna fatal'),
('Luna 24°'),
('Luna ground'),
('Oui'),
('Non'),
('Il y a 36 millions d’années'),
('Il y a 500 millions d’années'),
('Il y a 3,8 milliards d’années'),
('Il y a 4,51 milliards d’années'),
('La prolifération d’algues vertes'),
('L’invasion de bébés phoques'),
('La transformation en loup-garou'),
('Le fonctionnement des marées'),
/*QUIZ 2*/
('2021'),
('2024'),
('2027'),
('2034'),
('Entre 15 et 20 fois plus proche'),
('Deux fois plus loin'),
('A la même distance'),
('On l’ignore'),
('Evolutive Satellite American'),
('Extreme Speed Average'),
('European Space Agency'),
('Elite Space Agency'),
('Oui'),
('Non'),
('Ramener des échantillons de la Lune'),
('Récolter des informations sur la face cachée de la Lune'),
('Installer un sismomètre sur la Lune'),
('Envoyer les premiers Chinois à marcher sur la Lune'),
('KPLO'),
('Artemis III'),
('Luna 28'),
('Viper'),
('Envoyer un satellite autour de la Lune'),
('Envoyer des humains sur la Lune'),
('Envoyer un atterrisseur et  un astromobile'),
('Ramener des échantillons lunaires'),
('Oui'),
('Non');


-- TABLES RELATIONS

-- -----------------------------------------------------
-- INSTITUTION LAUNCHES MISSION
-- -----------------------------------------------------
INSERT INTO "institution_launches_mission"("id_institution", "id_mission") VALUES
(1, 4),
(1, 9),
(1, 12),
(1, 14),
(1, 15),
(1, 17),
(2, 6),
(2, 4),
(2, 5),
(2, 9),
(2, 10),
(2, 12),
(3, 1),
(3, 8),
(4, 3),
(4, 11),
(5, 6),
(5, 11),
(6, 2),
(6, 13),
(6, 14),
(6, 16),
(7, 7);

-- -----------------------------------------------------
-- PLANET WELCOMES MISSION
-- -----------------------------------------------------
INSERT INTO "planet_welcomes_mission"("id_planet", "id_mission") VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17);

-- -----------------------------------------------------
-- USER LIKES MISSION (favorites missions of the user)
-- -----------------------------------------------------
INSERT INTO "user_likes_mission"("id_user", "id_mission") VALUES
(1, 2),
(2, 1);

-- -----------------------------------------------------
-- QUIZ HANDLES QUESTION
-- -----------------------------------------------------
INSERT INTO "quiz_handles_question"("id_quiz", "id_question") VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
/*QUIZ 2*/
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16);

-- -----------------------------------------------------
-- USER PLAYS QUIZ
-- -----------------------------------------------------
INSERT INTO "user_plays_quiz"("id_user", "id_quiz", "score") VALUES
(1, 1, 5),
(2, 2, 8),
(3, 1, 7);

-- -----------------------------------------------------
-- QUESTION HAS PROPOSITION
-- -----------------------------------------------------
INSERT INTO "question_has_proposition"("id_question", "id_proposition") VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(6, 21),
(6, 22),
(7, 23),
(7, 24),
(7, 25),
(7, 26),
(8, 27),
(8, 28),
(8, 29),
(8, 30),
/*QUIZ 2*/
(9, 31),
(9, 32),
(9, 33),
(9, 34),
(10, 35),
(10, 36),
(10, 37),
(10, 38),
(11, 39),
(11, 40),
(11, 41),
(11, 42),
(12, 43),
(12, 44),
(13, 45),
(13, 46),
(13, 47),
(13, 48),
(14, 49),
(14, 50),
(14, 51),
(14, 52),
(15, 53),
(15, 54),
(15, 55),
(15, 56),
(16, 57),
(16, 58);

-- -----------------------------------------------------
-- PROPOSITION CONFIRMS QUESTION
-- -----------------------------------------------------
INSERT INTO "proposition_confirms_question"("id_proposition", "id_question") VALUES
(3, 1),
(6, 2),
(10, 3),
(15, 4),
(17, 5),
(21, 6),
(26, 7),
(30, 8),
/*QUIZ 2*/
(32, 9),
(35, 10),
(41, 11),
(43, 12),
(47, 13),
(48, 13),
(50, 14),
(51, 14),
(55, 15),
(58, 16);

COMMIT;