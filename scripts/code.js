function buildModel(sources) {
    var model = [];

    if (sources) {
        sources.forEach(source => {
            var lines = source.split(/\r?\n/);
            lines.forEach(line => {
                if (line) {
                    addLineToModel(line, model);
                }
            });
        });
    }

    return model;
}

function addLineToModel(line, model) {
    line = String.fromCharCode(0, 1) + line + String.fromCharCode(2);

    for (var index = 2; index != line.length; ++index) {
        var prev = line.substr(index - 2, 2);
        var char = line.substr(index, 1);

        var item = null;
        model.forEach(x => {
            if (x.prev === prev) {
                item = x;
            }
        });
        if (!item) {
            item = {
                prev: prev,
                freq: []
            };
            model.push(item);
        }

        var freq = null;
        item.freq.forEach(x => {
            if (x.char === char) {
                freq = x;
            }
        });
        if (!freq) {
            freq = {
                char: char,
                count: 0
            };
            item.freq.push(freq);
        }

        freq.count += 1;
    }
}

function generate(model, requiredResults) {
    var lines = [];
    var failures = 0;
    var allowedFailures = 100;

    while ((lines.length < requiredResults) && (failures < allowedFailures)) {
        var line = extractLine(model);
        if (line && (lines.indexOf(line) === -1))
            lines.push(line);
        else
            failures += 1;
    }

    return lines;
}

function extractLine(model) {
    var line = String.fromCharCode(0, 1);

    while (true) {
        var prev = line.substr(line.length - 2, 2);

        var item = null;
        model.forEach(x => {
            if (x.prev === prev) {
                item = x;
            }
        });
        if (item) {
            var candidates = "";
            item.freq.forEach(freq => {
                candidates += freq.char.repeat(freq.count);
            });
            var index = Math.floor(Math.random() * candidates.length);
            var char = candidates[index];

            if (char === String.fromCharCode(2)) {
                line = line.substr(2);
                return line;
            } else {
                line += char;
            }
        } else {
            return null;
        }
    }

    return null;
}