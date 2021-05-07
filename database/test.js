const { findByName, list, addRename } = require('./crud');


async function main() {
    await addRename('localizor_name0', 'new8 name5').catch(e => { console.error(e); });
    await addRename('localizor_name2', 'new4 name5').catch(e => { console.error(e); });
    await addRename('localizor_name3', 'new3 name2').catch(e => { console.error(e); });
    await addRename('localizor_name4', 'new2 name3').catch(e => { console.error(e); });
    await addRename('localizor_name5', 'new1 name7').catch(e => { console.error(e); });
    await findByName('localizor_name0').catch(e => { console.error(e); });
    await findByName('localizor_name').catch(e => { console.error(e); });
    await findByName('localizor_name5').catch(e => { console.error(e); });
    await list().catch(e => { console.error(e); });
}
main().catch(console.error);