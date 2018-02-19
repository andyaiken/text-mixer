var requiredResults = 10;
var allowedFailures = 100;

function generate(sources) {
    var model = buildModel(sources);

    var lines = [];
    var failures = 0;
    while ((lines.length < requiredResults) && (failures < allowedFailures)) {
        var line = extract(model);
        if (line && (lines.indexOf(line) === -1))
            lines.push(line);
        else
            failures += 1;
    }

    return lines;
}

function buildModel(sources) {
    var model = [];

    if (sources) {
        sources.forEach(source => {
            var lines = source.split(/\r?\n/);
            lines.forEach(line => {
                // TODO: Add this line to the model
            });
        });
    }

    return model;
}

function extract(model) {
    // TODO: Extract a line from the model
    return "xxx";
}