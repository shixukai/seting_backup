// Generated by CoffeeScript 1.8.0
(function() {
  var QuickProxyApp, basicAuth, error, info, test, testPaveoSpeed, testRequestSpeed,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  error = function(msg) {
    $(".prompt").hide();
    return $("#error").text(msg).slideDown();
  };

  info = function(msg) {
    $(".prompt").hide();
    return $("#info").text(msg).slideDown();
  };

  basicAuth = function(username, password) {
    return 'Basic ' + encodeBase64(username + ':' + password);
  };

  testRequestSpeed = function(url, callback) {
    var st;
    st = Date.now();
    return jQuery.ajax({
      type: "GET",
      url: url + '',
      processData: true,
      data: {
        rnd: Math.random()
      },
      success: function(data, textStatus, jqXHR) {
        var duration, rate, size;
        size = parseInt(jqXHR.getResponseHeader('content-length'));
        duration = Date.now() - st;
        rate = (size / duration).toFixed(2);
        return callback(duration, rate);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var duration, rate, size;
        if (jqXHR.status === 0) {
          return callback(-1, -1);
        } else {
          size = parseInt(jqXHR.getResponseHeader('content-length'));
          duration = Date.now() - st;
          rate = (size / duration).toFixed(2);
          return callback(duration, rate);
        }
      }
    });
  };

  testPaveoSpeed = function(url, callback) {
    var done, download, imageAddr, st;
    download = new Image();
    st = Date.now();
    done = false;
    download.onload = function() {
      var duration, rate;
      if (done) {
        return;
      }
      done = true;
      duration = Date.now() - st;
      rate = (128000.0 / duration).toFixed(2);
      return callback(duration, rate);
    };
    download.onerror = function() {
      if (done) {
        return;
      }
      done = true;
      return callback(-1, -1);
    };
    setTimeout(function() {
      if (done) {
        return;
      }
      done = true;
      return callback(-1, -1);
    }, 40000);
    imageAddr = url + "?rnd=" + Math.random();
    return download.src = imageAddr;
  };

  QuickProxyApp = (function(_super) {
    __extends(QuickProxyApp, _super);

    QuickProxyApp.prototype.events = {
      "change #proxy_switch": "switchProxy",
      "click #secret_mode_button": "enterSecretMode",
      "click #paveo_fetch_button": "updatePaveoProfileList",
      "click #paveo_back_button": "exitSecretMode",
      "click #speed_test_button": "startSpeedTest",
      "click #settings_button": "enterSettingsPage",
      "click #settings_back_button": "exitSettingsPage",
      "click #settings_save_button": "saveGlobalSettings"
    };

    QuickProxyApp.prototype.elements = {
      "#proxy_switch": "proxySwitch",
      "#speed_test_button": "speedTestButton",
      "#secret_mode_button": "secretModeButton",
      "#sec_mode_username_entry": "secUsernameEntry",
      "#sec_mode_password_entry": "secPasswordEntry",
      "#global_bypass_settings": "globalBypassSettings",
      "#global_bypass_swtich": "globalBypassSwitch",
      "#ignore_bypass_swtich": "ignoreBypassSwitch",
      "#paveo_fetch_button": "pgayFetchButton",
      "#proxy_status": "proxyStatus"
    };

    function QuickProxyApp() {
      this.startSpeedTest = __bind(this.startSpeedTest, this);
      this.updateState = __bind(this.updateState, this);
      this.updatePaveoProfileList = __bind(this.updatePaveoProfileList, this);
      this.checkSecretMode = __bind(this.checkSecretMode, this);
      this.setPaveoDefault = __bind(this.setPaveoDefault, this);
      this.purgeProfiles = __bind(this.purgeProfiles, this);
      this.fetchPaveo = __bind(this.fetchPaveo, this);
      this.batchAddProfile = __bind(this.batchAddProfile, this);
      this.exitSettingsPage = __bind(this.exitSettingsPage, this);
      this.saveGlobalSettings = __bind(this.saveGlobalSettings, this);
      this.fetchGlobalSettings = __bind(this.fetchGlobalSettings, this);
      this.enterSettingsPage = __bind(this.enterSettingsPage, this);
      this.exitSecretMode = __bind(this.exitSecretMode, this);
      this.enterSecretMode = __bind(this.enterSecretMode, this);
      this.switchProxy = __bind(this.switchProxy, this);
      this.reapplyProxy = __bind(this.reapplyProxy, this);
      this.updateProxyStatus = __bind(this.updateProxyStatus, this);
      this.fetchData = __bind(this.fetchData, this);
      this.fixTheMotherfuckerChromeBug = __bind(this.fixTheMotherfuckerChromeBug, this);
      this.initUI = __bind(this.initUI, this);
      var proc;
      QuickProxyApp.__super__.constructor.apply(this, arguments);
      this.sandbox = new SandBoxCtrl('#sandbox');
      this.sandbox.register();
      this.state = false;
      proc = [];
      proc.push((function(_this) {
        return function() {
          return _this.initUI(function() {
            return $(window).dequeue('init');
          });
        };
      })(this));
      proc.push((function(_this) {
        return function() {
          return _this.fetchData(function() {
            return $(window).dequeue('init');
          });
        };
      })(this));
      proc.push((function(_this) {
        return function() {
          return _this.updateState(function() {
            return $(window).dequeue('init');
          });
        };
      })(this));
      proc.push((function(_this) {
        return function() {
          return _this.setPaveoDefault(function() {
            return $(window).dequeue('init');
          });
        };
      })(this));
      proc.push((function(_this) {
        return function() {
          return _this.checkSecretMode(function() {
            return $(window).dequeue('init');
          });
        };
      })(this));
      proc.push((function(_this) {
        return function() {
          return _this.fetchGlobalSettings(function() {
            return $(window).dequeue('init');
          });
        };
      })(this));
      proc.push((function(_this) {
        return function() {
          return _this.fixTheMotherfuckerChromeBug(function() {
            return $(window).dequeue('init');
          });
        };
      })(this));
      $(window).queue('init', proc);
      $(window).dequeue('init');
    }

    QuickProxyApp.prototype.initUI = function(callback) {
      if (!this.sandbox.ready) {
        return setTimeout((function(_this) {
          return function() {
            return _this.initUI(callback);
          };
        })(this), 100);
      } else {
        Logging.info("Init UI");
        this.profileList = new ProfileList({
          el: $('#profile_list'),
          sandbox: this.sandbox,
          parentCtrl: this
        });
        this.profileDetail = new ProfileDetail({
          el: $('#profile_detail_page'),
          sandbox: this.sandbox
        });
        $(window).keypress((function(_this) {
          return function(e) {
            if (document.activeElement && document.activeElement.tagName !== 'BODY') {
              return;
            }
            switch (e.keyCode) {
              case 111:
                return app.switchPage("settings");
              case 97:
                app.switchPage("list", true);
                return _this.profileList.addProfile();
            }
          };
        })(this));
        Logging.info("Init Keyboard Listeners");
        return callback();
      }
    };

    QuickProxyApp.prototype.fixTheMotherfuckerChromeBug = function(callback) {
      var currentHeight, currentWidth;
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (window.outerHeight < 170) {
        currentHeight = window.outerHeight;
        currentWidth = $('html').width();
        $('html').width(currentWidth - 0.0001);
        return setTimeout((function(_this) {
          return function() {
            $('html').width(currentWidth);
            return Logging.info("outerHeight too small, changed from " + currentHeight + " to " + window.outerHeight);
          };
        })(this), 200);
      }
    };

    QuickProxyApp.prototype.fetchData = function(callback) {
      Logging.info("Fetch data from storage");
      Profile.fetch();
      return callback();
    };

    QuickProxyApp.prototype.updateProxyStatus = function() {
      if (this.state) {
        return this.proxyStatus.html('<strong>' + localStorage.getItem("selected") + '</strong>');
      } else {
        return this.proxyStatus.html('Not connected');
      }
    };

    QuickProxyApp.prototype.reapplyProxy = function() {
      if (this.proxySwitch.prop('checked')) {
        Agent.disable();
        this.state = false;
        return setTimeout((function(_this) {
          return function() {
            Agent.enable(_this.profileList.getCurrent());
            return _this.state = true;
          };
        })(this), 200);
      }
    };

    QuickProxyApp.prototype.switchProxy = function(event) {
      if (this.proxySwitch.prop('checked')) {
        Agent.enable(this.profileList.getCurrent());
        this.state = true;
      } else {
        Logging.info("Disable all proxies.");
        Agent.disable();
        this.state = false;
      }
      this.speedTestButton.attr('disabled', this.proxySwitch.prop('checked'));
      return this.updateProxyStatus();
    };

    QuickProxyApp.prototype.enterSecretMode = function() {
      return app.switchPage('paveo');
    };

    QuickProxyApp.prototype.exitSecretMode = function() {
      return app.switchPage('list');
    };

    QuickProxyApp.prototype.enterSettingsPage = function() {
      return app.switchPage('settings');
    };

    QuickProxyApp.prototype.fetchGlobalSettings = function(callback) {
      var settings;
      settings = localStorage.getItem("Settings");
      if (settings) {
        settings = JSON.parse(settings);
        if (settings.bypass) {
          this.globalBypassSettings.val(settings.bypass);
        }
        if (settings.enableBypass) {
          this.globalBypassSwitch.attr('checked', true);
        }
        if (settings.ignoreBypass) {
          this.ignoreBypassSwitch.attr('checked', true);
        }
      }
      return callback();
    };

    QuickProxyApp.prototype.saveGlobalSettings = function() {
      var settings;
      settings = localStorage.getItem("Settings");
      if (settings) {
        settings = JSON.parse(settings);
      }
      if (!settings) {
        settings = {};
      }
      settings.bypass = this.globalBypassSettings.val().trim();
      settings.enableBypass = this.globalBypassSwitch.attr('checked') === 'checked';
      settings.ignoreBypass = this.ignoreBypassSwitch.attr('checked') === 'checked';
      localStorage.setItem("Settings", JSON.stringify(settings));
      app.switchPage('list');
      return this.reapplyProxy();
    };

    QuickProxyApp.prototype.exitSettingsPage = function() {
      return this.fetchGlobalSettings((function(_this) {
        return function() {
          return app.switchPage('list');
        };
      })(this));
    };

    QuickProxyApp.prototype.batchAddProfile = function(bypasslist, proxies) {
      var k, name, p, v, _results;
      if (typeof bypasslist === "string") {
        bypasslist = bypasslist.split(",");
      }
      _results = [];
      for (k in proxies) {
        v = proxies[k];
        name = "SSLedge " + k;
        p = null;
        p = Profile.getByName(name);
        if (p.length === 0) {
          p = new Profile();
        } else {
          p = p[0];
        }
        p.name = name;
        p.type = "manual";
        p.scheme = 'https';
        p.pac_url = "";
        p.host = v.host;
        p.port = v.port;
        p.testlink = v.testlink;
        if (typeof v.bypass === "string") {
          p.bypass = v.bypass.split(",");
        } else {
          p.bypass = bypasslist;
        }
        if (v.use_auth) {
          p.use_auth = v.use_auth;
          p.username = v.username;
          p.password = v.password;
        } else {
          if (this.secUsernameEntry && this.secUsernameEntry.val()) {
            p.use_auth = true;
            p.username = this.secUsernameEntry.val();
            p.password = this.secPasswordEntry.val();
          } else {
            p.use_auth = false;
          }
        }
        _results.push(p.save());
      }
      return _results;
    };

    QuickProxyApp.prototype.fetchPaveo = function(url, success, error) {
      return this.doRequest('POST', url, {
        user: this.secUsernameEntry.val(),
        pass: this.secPasswordEntry.val()
      }, {}, function(data) {
        data = JSON.parse(data);
        return success(data);
      }, function() {
        return error();
      });
    };

    QuickProxyApp.prototype.purgeProfiles = function(prefixes) {
      var i, prefix, _results;
      if (typeof prefixes === 'string') {
        prefixes = [prefixes];
      }
      _results = [];
      for (i in prefixes) {
        prefix = prefixes[i];
        _results.push(Profile.each((function(_this) {
          return function(profile) {
            if (profile.name.indexOf(prefix) === 0) {
              return Profile.destroy(profile.id);
            }
          };
        })(this)));
      }
      return _results;
    };

    QuickProxyApp.prototype.setPaveoDefault = function(callback) {
      var defaults;
      defaults = localStorage.getItem("Defaults");
      Logging.info("Try to get default proxies");
      return this.fetchPaveo('paveo_defaults.json', (function(_this) {
        return function(data) {
          var currVersion, lastVersion, needReload;
          needReload = false;
          lastVersion = localStorage.getItem("lastVersion");
          currVersion = chrome.app.getDetails().version;
          if (!lastVersion) {
            lastVersion = null;
          }
          if (defaults !== JSON.stringify(data)) {
            Logging.info("Default proxies has been changed, need to reload");
            needReload = true;
          } else if (currVersion !== lastVersion) {
            Logging.info("Version has been changed, need to reload");
            localStorage.setItem("version", currVersion);
            needReload = true;
          }
          if (needReload) {
            if (data.purge) {
              _this.purgeProfiles(data.purge);
            }
            localStorage.setItem("Defaults", JSON.stringify(data));
            _this.batchAddProfile(data.bypasslist, data.proxies);
            setTimeout(function() {
              return Profile.fetch();
            }, 200);
          }
          return callback();
        };
      })(this), (function(_this) {
        return function(xhr, textStatus, err) {
          Logging.info("No default proxies");
          return callback();
        };
      })(this));
    };

    QuickProxyApp.prototype.checkSecretMode = function(callback) {
      Logging.info("Try to access secret mode");
      return this.doRequest('GET', 'secret_mode.json', null, {}, (function(_this) {
        return function(data) {
          _this.secretModeButton.show();
          return callback();
        };
      })(this), (function(_this) {
        return function(xhr, textStatus, err) {
          Logging.info("No secret mode");
          return callback();
        };
      })(this));
    };

    QuickProxyApp.prototype.updatePaveoProfileList = function() {
      var restore;
      restore = (function(_this) {
        return function() {
          _this.pgayFetchButton.val('Update');
          return _this.pgayFetchButton.attr('disabled', false);
        };
      })(this);
      this.pgayFetchButton.attr('disabled', true);
      this.pgayFetchButton.val('Updating ...');
      return this.fetchPaveo('https://api.edgessl.com/ssledge/gpn.php', (function(_this) {
        return function(data) {
          _this.batchAddProfile(data.bypasslist, data.proxies);
          return setTimeout(function() {
            restore();
            Profile.fetch();
            return app.switchPage('list');
          }, 200);
        };
      })(this), (function(_this) {
        return function(xhr, textStatus, err) {
          restore();
          Logging.error('failed to Authorize.');
          return error("Incorrect username or password");
        };
      })(this));
    };

    QuickProxyApp.prototype.hidePage = function() {
      return this.el.find('.page:visible').hide();
    };

    QuickProxyApp.prototype.switchPage = function(name, noAnimate) {
      var targetElement, visibleElement;
      if (this.currentPage) {
        if (this.currentPage === name) {
          return;
        }
      }
      this.currentPage = name;
      visibleElement = this.el.find('.page:visible');
      targetElement = $("#profile_" + name + "_page");
      if (visibleElement.attr('id') === targetElement.attr('id')) {
        return;
      }
      $('#error').hide();
      if (noAnimate) {
        visibleElement.hide();
        return targetElement.show();
      } else {
        visibleElement.slideUp();
        return targetElement.slideDown();
      }
    };

    QuickProxyApp.prototype.updateState = function(callback) {
      Logging.info("Update proxy status");
      return chrome.proxy.settings.get({
        'incognito': false
      }, (function(_this) {
        return function(config) {
          var controlable;
          controlable = false;
          if (config.levelOfControl === 'controlled_by_this_extension') {
            _this.proxySwitch.attr('checked', true).prop('checked', true);
            controlable = true;
          }
          if (config.levelOfControl === 'controllable_by_this_extension') {
            _this.proxySwitch.attr('checked', false);
            _this.proxySwitch.prop('checked', false);
            controlable = true;
          }
          if (controlable) {
            if (config.value.mode === 'direct') {
              _this.proxySwitch.attr('checked', false);
              _this.proxySwitch.prop('checked', false);
            }
          } else {
            _this.proxySwitch.attr({
              'disabled': true,
              'checked': false
            }).prop({
              'disabled': true,
              'checked': false
            });
          }
          _this.speedTestButton.attr('disabled', _this.proxySwitch.prop('checked'));
          _this.state = _this.proxySwitch.prop('checked');
          _this.updateProxyStatus();
          return callback();
        };
      })(this));
    };

    QuickProxyApp.prototype.doRequest = function(method, url, data, headers, success, error) {
      return jQuery.ajax({
        type: method,
        url: url,
        processData: data !== null,
        data: data,
        beforeSend: function(xhr) {
          var k, v;
          for (k in headers) {
            v = headers[k];
            xhr.setRequestHeader(k, v);
          }
          return xhr.overrideMimeType('text/plain; charset=x-user-defined');
        },
        success: function(data) {
          return success(data);
        },
        error: function(xhr, textStatus, err) {
          return error(xhr, textStatus, err);
        }
      });
    };

    QuickProxyApp.prototype.fakeHTTPAuth = function(p, success, error) {
      var headers;
      Logging.info('Test Authorization');
      headers = {
        'Authorization': basicAuth(p.username, p.password)
      };
      return this.doRequest("GET", "http://google.com", {
        rnd: Math.random()
      }, headers, function(data) {
        if (success) {
          return success(data);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Logging.error('Failed to Authorize');
        if (error) {
          return error(jqXHR, textStatus, errorThrown);
        }
      });
    };

    QuickProxyApp.prototype.startSpeedTest = function() {
      var procs, profile, req_link, _i, _len, _load, _load_paveo, _ref;
      procs = [];
      _load = (function(_this) {
        return function(name, link) {
          return procs.push(function() {
            _this.profileList.setPingText(name, 'testing ...');
            return testRequestSpeed(link, function(duration, rate) {
              if (duration === -1) {
                _this.profileList.setPingText(name, '??');
              } else {
                Logging.info("" + name + ", " + duration + ", " + rate + " kb/s");
                _this.profileList.setPingText(name, (duration / 1000.0).toFixed(2) + 's');
                _this.profileList.setRateText(name, ', ' + rate + 'kb/s');
              }
              return $(window).dequeue('_test_speed');
            });
          });
        };
      })(this);
      _load_paveo = (function(_this) {
        return function(name, req_link, link) {
          return procs.push(function() {
            _this.profileList.setPingText(name, 'testing ...');
            return testRequestSpeed(req_link, function(dur1, rate1) {
              if (dur1 === -1) {
                _this.profileList.setPingText(name, '??');
              } else {
                _this.profileList.setPingText(name, (dur1 / 1000.0).toFixed(2) + 's');
              }
              _this.profileList.setRateText(name, ', testing ...');
              return testPaveoSpeed(link, function(dur2, rate2) {
                Logging.info("" + name + ", " + dur1 + ", " + dur2 + ", " + rate2 + "kb/s");
                if (dur2 === -1) {
                  _this.profileList.setRateText(name, ', ??');
                } else {
                  _this.profileList.setRateText(name, ', ' + rate2 + 'kb/s');
                }
                return $(window).dequeue('_test_speed');
              });
            });
          });
        };
      })(this);
      _ref = Profile.all();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        profile = _ref[_i];
        if (profile.type === 'manual' && (profile.scheme === 'http' || profile.scheme === 'https')) {
          this.profileList.setPingText(name, 'waiting ...');
          this.profileList.setRateText(name, '');
          req_link = profile.scheme + "://" + profile.host + ":" + profile.port;
          if (profile.testlink) {
            _load_paveo(profile.name, req_link, profile.testlink);
          } else {
            _load(profile.name, req_link);
          }
        } else {
          this.profileList.setPingText(name, '??');
          this.profileList.setRateText(name, '');
        }
      }
      $(window).queue('_test_speed', procs);
      return $(window).dequeue('_test_speed');
    };

    return QuickProxyApp;

  })(Spine.Controller);

  window.app = null;

  $(document).ready(function() {
    return window.app = new QuickProxyApp({
      el: $('body')
    });
  });

  test = function() {
    return $('#test_speed_button').click(function() {});
  };

}).call(this);