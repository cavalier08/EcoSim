document.addEventListener('DOMContentLoaded', function() {
    const numberForm = document.getElementById('numberForm');

    numberForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Get references to all input elements
        const rabbitCount = document.getElementById('rabbitCount').value;
const foxCount = document.getElementById('foxCount').value;
const deerCount = document.getElementById('deerCount').value;
const coyoteCount = document.getElementById('coyoteCount').value;
const bobcatCount = document.getElementById('bobcatCount').value;
const sparrowCount = document.getElementById('sparrowCount').value;
const hawkCount = document.getElementById('hawkCount').value;
const grassCount = document.getElementById('grassCount').value;
const wildflowerCount = document.getElementById('wildflowerCount').value;
const shrubCount = document.getElementById('shrubCount').value;
const treeCount = document.getElementById('treeCount').value;
const weedCount = document.getElementById('weedCount').value;
const butterflyCount = document.getElementById('butterflyCount').value;
const beetleCount = document.getElementById('beetleCount').value;
const grasshopperCount = document.getElementById('grasshopperCount').value;
const antCount = document.getElementById('antCount').value;

// Store the entered values in sessionStorage to pass to the result page
sessionStorage.setItem('RabbitCount', rabbitCount);
sessionStorage.setItem('FoxCount', foxCount);
sessionStorage.setItem('DeerCount', deerCount);
sessionStorage.setItem('CoyoteCount', coyoteCount);
sessionStorage.setItem('BobcatCount', bobcatCount);
sessionStorage.setItem('SparrowCount', sparrowCount);
sessionStorage.setItem('HawkCount', hawkCount);
sessionStorage.setItem('GrassCount', grassCount);
sessionStorage.setItem('WildflowerCount', wildflowerCount);
sessionStorage.setItem('ShrubCount', shrubCount);
sessionStorage.setItem('TreeCount', treeCount);
sessionStorage.setItem('WeedCount', weedCount);
sessionStorage.setItem('ButterflyCount', butterflyCount);
sessionStorage.setItem('BeetleCount', beetleCount);
sessionStorage.setItem('GrasshopperCount', grasshopperCount);
sessionStorage.setItem('AntCount', antCount);

window.location.href = 'app.html';
    });
});

