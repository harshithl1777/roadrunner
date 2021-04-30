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
        if (card.name.includes('Tier')) {
            const name = card.name.slice(0, card.name.search('Tier')-3);
            card.tier = card.name.slice(card.name.search('Tier'), card.name.search('Tier')+6).toUpperCase();
            card.geo = card.name.slice(card.name.search('Tier')+9).toUpperCase();
            card.cpi = (card.name.includes('[CPI]')) ? 'Yes' : 'No Data';
            card.name = name;
            return card;
        } else {
            const name = card.name.slice(0, card.name.search('-')-1);
            card.tier = 'No Data';
            card.geo = card.name.slice(card.name.search('-')+2).toUpperCase();
            card.cpi = (card.name.includes('[CPI]')) ? 'Yes' : 'No Data';
            card.name = name;
            return card;
        }
    });
}

const formatDesc = (data) => {
    return data.map(card => {
        const desc = card.desc.split('\n');
        card.pkgName = 'No Data';
        card.developer = 'No Data';
        card.submittedBy = 'No Data';
        card.category = 'No Data';
        desc.forEach((item1) => {
            console.log(item1);
            const itemCopy = item1.toLowerCase().replace(/\s+/g, '');
            if (itemCopy.includes('packagename')) card.pkgName = item1.slice(item1.search(':')+2);
            else if (itemCopy.includes('developer:')) card.developer = item1.slice(item1.search(':')+2);
            else if (itemCopy.includes('broughttousby')) card.submittedBy = capitalize(item1.slice(item1.search(':')+2, item1.search('@')));
            else if (itemCopy.includes('cpideal') && card.cpi === 'No Data') card.cpi = capitalize(item1.slice(item1.search(':')+2));
            else if (itemCopy.includes('category')) card.category = item1.slice(item1.search(':')+2);
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
                case 'CPI':
                    cpi = 'Yes';
                    break
                case 'cpi':
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

const performFullFormatting = (data) => {
    return createResource(formatLabels(formatDesc(formatName(removeUnwanted(data)))));
}

module.exports = performFullFormatting;
