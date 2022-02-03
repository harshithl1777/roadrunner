const capitalize = (str) => {
    if (str) return str[0].toUpperCase() + str.slice(1);
    return '';
}

const removeUnwanted = (data) => {
    return data.map(({ name, desc, labels }) => {
        return { name, desc, labels };
    });
}

const formatName = (data) => {
    return data.map(card => {
        const name = card.name.slice(0, card.name.search('-')-1);
        card.cpi = (card.name.includes('[CPI]')) ? 'Yes' : 'No';
        card.name = name;
        return card;
    });
}

const formatDesc = (data) => {
    return data.map(card => {
        const desc = card.desc.split('\n');
        card.pkgName = 'No Data';
        card.developer = 'No Data';
        card.categories = 'No Data';
        desc.forEach((item1) => {
            const itemCopy = item1.toLowerCase().replace(/\s+/g, '');
            if (itemCopy.includes('package_name') || itemCopy.includes('package name')) card.pkgName = item1.slice(item1.search(':')+2);
            else if (itemCopy.includes('developer:')) card.developer = item1.slice(item1.search(':')+2);
            else if (itemCopy.includes('categories')) card.categories = item1.slice(item1.search(':')+2);
            else if (itemCopy.includes('target geos')) card.geo = item1.slice(item1.search(':')+2);
            else if (itemCopy.includes('ratings')) card.tier = item1.slice(item1.search(':')+2);

            if (itemCopy.includes('target geos')) console.log(item1.slice(item1.search(':')+2));
        });
        return card;
    });
}

const formatLabels = (data) => {
    return data.map((card) => {
        let cpc = 'No'; let gameTV = 'No'; let branding = 'No'; let status = 'Not Live'; let cpi = card.cpi;
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
                    cpc = 'Yes';
                    break
                case '$$deal':
                    cpi = 'Yes';
                    break
                case '$$ Deal':
                    cpi = 'Yes';
                    break
                default:
            }
        });
        card.cpi = cpi;
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
            card.categories, 
            card.tier, 
            card.geo,
            card.gameTV,
            card.cpi,
            card.branding,
            card.cpc,
            card.status
        ];
    });
}

const performFullFormatting = (data) => {
    return createResource(formatLabels(formatDesc(formatName(removeUnwanted(data)))));
}

module.exports = performFullFormatting;
