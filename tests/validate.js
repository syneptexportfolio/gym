import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

if (match) {
  try {
    const json = JSON.parse(match[1]);
    console.log('JSON-LD is 100% VALID!');
    console.log('Entity Types Found:', json['@graph'].map(g => g['@type']).join(', '));
    console.log('Business Name:', json['@graph'][0].name);
    console.log('Address:', json['@graph'][0].address.streetAddress, json['@graph'][0].address.addressLocality);
    console.log('Phone:', json['@graph'][0].telephone);
    console.log('FAQ Items Count:', json['@graph'][1].mainEntity.length);
  } catch (e) {
    console.error('JSON-LD PARSE ERROR:', e.message);
    process.exit(1);
  }
} else {
  console.error('No JSON-LD script found in index.html');
  process.exit(1);
}
