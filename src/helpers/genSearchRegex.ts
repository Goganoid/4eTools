const escRegex = (t: string) => {
  return t.replace(/([()?*+.\\{}[\]])/g, '\\$1');
};

// from http://iws.mx/dnd

export const genSearchRegexOriginal = (search: string) => {
  var n = [],
    r = !1,
    i = '^',
    s = search.trim().match(/(^| )\/.+\/(?= |$)|[+-]?(?:"[^"]+"|\S+)/g);
  if (!s) return null;
  console.info('[Search] Tokens: ' + JSON.stringify(s));
  while (s.length > 0 && s[0] === 'OR') s.splice(0, 1);
  var o = s.length;
  while (o > 0 && s[o - 1] === 'OR') s.splice(--o, 1);
  for (var u = 0; u < o; ) {
    var a = [];
    do {
      var f = s[u].trim(),
        l = '',
        c = !1;
      f.charAt(0) === '-'
        ? ((f = f.substr(1)), (l += '(?!.*'), (r = !0))
        : (f.charAt(0) === '+' && ((f = f.substr(1)), (c = !0)),
          (l += '(?=.*')),
        f &&
          (/^\/.+\/$/.test(f)
            ? (f = f.substr(1, f.length - 2))
            : /^"[^"]*"$/.test(f)
            ? ((f =
                f.length > 2 ? escRegex(f.substr(1, f.length - 2)) : ''),
              (f = f.replace(/\\\*/g, '\\S+')))
            : f === 'NIL'
            ? ((f = ''), (l += '^$'))
            : (f.charAt(0) === '"' && (f = f.substr(1)),
              f && (f = escRegex(f)),
              (f = f.replace(/\\\*/g, '[^\\s<>]+'))),
          f && (c && (f = '\\b' + f + '\\b'), (l += f)),
          l &&
            (l.indexOf('(?=') === 0 && f && f.length > 2 && n.push(f),
            (l += '.*)'),
            a.push(l))),
        u++;
      if (u >= o || s[u] !== 'OR') break;
      do ++u;
      while (u < o && s[u] === 'OR');
    } while (u < o);
    a.length === 1 ? (i += a[0]) : a.length && (i += '(?:' + a.join('|') + ')');
  }
  return i === '^'
    ? null
    : (console.info('[Search] Regx: ' + i),
      {
        regexp: RegExp(i, 'i'),
        highlight: n.length ? n : null,
        hasExclude: r,
      });
};


export const genSearchRegex = (search: string) => {

    let n = [],
        r = false, // Flag for exclusion
        i = "^", // Starting regex pattern with beginning of string anchor
        s = search.trim().match(/(^| )\/.+\/(?= |$)|[+-]?(?:"[^"]+"|\S+)/g); // Tokenize input

    // If no tokens, return null
    if (!s) return null;

    console.info("[Search] Tokens: " + JSON.stringify(s));

    // Remove leading "OR" tokens
    while (s.length > 0 && s[0] === "OR") s.splice(0, 1);

    var o = s.length;

    // Remove trailing "OR" tokens
    while (o > 0 && s[o - 1] === "OR") s.splice(--o, 1);

    // Process tokens to build regex pattern
    for (var u = 0; u < o;) {
        var a = []; // Array for current segment of the pattern
        do {
            var f = s[u].trim(), // Current token
                l = "", // Current segment regex
                c = false; // Flag for whole-word match

            // Handle exclusion
            if (f.charAt(0) === "-") {
                f = f.substr(1);
                l += "(?!.*";
                r = true;
            } else {
                // Handle inclusion
                if (f.charAt(0) === "+") {
                    f = f.substr(1);
                    c = true; // Whole-word match
                }
                if (f && f.length > 2) n.push(f);
                l += "(?=.*";
            }

            if (f) {
                // Handle literal regex
                if (/^\/.+\/$/.test(f)) {
                    f = f.slice(1, f.length - 1);
                }
                // Handle quoted term
                else if (/^"[^"]*"$/.test(f)) {
                    f = f.length > 2 ? escRegex(f.slice(1, f.length - 1)) : "";
                    f = f.replace(/\\\*/g, "\\S+");
                }
                // Handle NIL (empty)
                else if (f === "NIL") {
                    f = "";
                    l += "^$";
                } else {
                    // Handle unquoted term
                    if (f.charAt(0) === '"') f = f.slice(1);
                    if (f) f = escRegex(f);
                    f = f.replace(/\\\*/g, "[^\\s<>]+");
                }

                // Append processed term to segment
                if (f) {
                    if (c) f = "\\b" + f + "\\b";
                    l += f;
                }

                l += ".*)";
                a.push(l);
            }

            u++;

            // Skip "OR" tokens
            if (u >= o || s[u] !== "OR") break;
            do ++u; while (u < o && s[u] === "OR");

        } while (u < o);

        // Append segment to main pattern
        if (a.length === 1) {
            i += a[0];
        } else if (a.length) {
            i += "(?:" + a.join("|") + ")";
        }
    }

    // Return constructed regex and metadata
    return i === "^" ? null : (console.info("[Search] Regx: " + i), {
        regexp: RegExp(i, "i"),
        highlight: n.length ? n : null,
        hasExclude: r
    });
}