const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}

const removeUnwanted = (data) => {
    return data.map(({ name, desc, labels }) => {
        return { name, desc, labels };
    });
}

const formatName = (data) => {
    return data.map(card => {
        const name = card.name.slice(0, card.name.search('Tier')-3);
        card.tier = card.name.slice(card.name.search('Tier'), card.name.search('Tier')+6).toUpperCase();
        card.geo = card.name.slice(card.name.search('Tier')+9).toUpperCase();
        card.name = name;
        return card;
    });
}

const formatDesc = (data) => {
    return data.map(card => {
        const desc = card.desc.split('\n');
        card.pkgName = desc[1].slice(desc[1].search(':')+2);
        card.developer = desc[6].slice(desc[6].search(':')+2);
        card.submittedBy = capitalize(desc[5].slice(desc[5].search(':')+2, desc[5].search('@')));
        card.cpi = capitalize(desc[2].slice(desc[2].search(':')+2));
        card.category = desc[7].slice(desc[7].search(':')+2);
        return card;
    });
}

const formatLabels = (data) => {
    return data.map((card) => {
        let cpc = 'No'; let gameTV = 'No'; let branding = 'No'; let status = 'No Data';
        card.labels.forEach(({ name })=> {
            switch(name) {
                case 'Game.tv':
                    gameTV = 'Yes';
                    break
                case 'Branding':
                    branding = 'Yes';
                    break
                case 'not live':
                    status = 'Not Live';
                    break
                case 'live':
                    status = 'Live';
                    break
                case 'CPC':
                    cpc = 'Yes'
                    break
                default:
            }
        });
        card.cpc = cpc;
        card.gameTV = gameTV;
        card.branding = branding;
        card.status = status;
        return card;
    });
}

const createResource = (data) => {
    return data.map(card => {
        return [
            card.name, 
            card.pkgName, 
            card.developer, 
            card.category, 
            card.tier, 
            card.geo,
            card.submittedBy,
            card.gameTV,
            card.cpi,
            card.branding,
            card.cpc,
            card.status
        ];
    });
}

const performFullFormat = (data) => {
    return createResource(formatLabels(formatDesc(formatName(removeUnwanted(data)))));
}

module.exports = performFullFormat;
