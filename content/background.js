io.connect('http://54.72.220.44/').on('update', function(data) {
    var decoded = jQuery('<div/>').html(data).text();
    var message = jQuery(decoded).text();
    Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService).showAlertNotification('chrome://tppupdater/content/icon48.png', 'Twitch Plays Pok\u00E9mon', message, false, '', null, '');
});
