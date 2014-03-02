var alertsService = Components.classes['@mozilla.org/alerts-service;1'].getService(Components.interfaces.nsIAlertsService);
var LIVE_URL = 'http://54.194.157.89/feed';

var NOTIFICATION_DURATION = 30000;
var UPDATE_TIMEOUT = 30000;

var lastUpdateId = 0;
var tppupdatericon = 'data:image/png;base64,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';

function readUpdates() {     
    jQuery.ajax({
        dataType: 'json',
        url: LIVE_URL,
        headers: {
            'last-id': lastUpdateId
        },
        success: function (data) {
            if (data && data.data) {
                var newestUpdate = data.data;

                if (newestUpdate && newestUpdate.id !== lastUpdateId) {
                    lastUpdateId = newestUpdate.id;

                    var decoded = jQuery('<div/>').html(newestUpdate.body_html).text();
                    var message = jQuery(decoded).text();

                    alertsService.showAlertNotification(tppupdatericon, 'Twitch Plays Pok\u00E9mon', message, false, '', null, '');
                }
            } 
        }
    });
    
    setTimeout(readUpdates, UPDATE_TIMEOUT);
}

readUpdates();
