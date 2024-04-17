<?php
$sites = [
  'FRONTEND',
  'BACKEND',
  'DOCS',
];
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>

    <title>Power Stack — Dashboard</title>
    <style>
      header {
        background-color: #FFF;
        width: 100%;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1000;
        height: 70px;
        border-bottom: 1px solid lightGrey;
      }
      header div {
        margin: 0 auto;
        max-width: 1400px;
        padding: 16px 0;
      }
      header div img {
        height: 35px;
      }
      a {
        color: black;
      }

      a:hover {
        text-decoration: underline;
      }

      .card {
        background: white;
        border-radius: 0.5rem;
        border: 1px solid #EAECF0;
        box-shadow: 0px 1px 3px rgb(16 24 40 / 10%), 0px 1px 2px rgb(16 24 40 / 6%);
        padding: 1rem;
      }

      .card a {
        text-decoration: none;
      }

      .title {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 0.875rem;
        letter-spacing: 0.025em;
        color: #69778c;
      }
    </style>

</head>

<body style='
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    font-size: 18px;
    background: #FCFCFD;
    margin: 0;
'>

<header>
    <div>
        <img src="logo.svg">
    </div>
</header>
<div style="
    max-width: 60rem;
    margin: 0 auto;
    padding: 2rem;
">
    <h1>Dashboard</h1>
    <H2>Services</H2>
    <div style="
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    display: grid;
  ">
      <?php foreach ($sites as $site): ?>
          <div id="<?php echo strtolower($site) ?>" class="card">
              <p class="title">
                <?php echo $site ?>&nbsp;<span id="status-<?php echo strtolower($site) ?>" data-service_url="<?php echo $_SERVER['REQUEST_SCHEME'] . '://' . strtolower($site) . '.' . getenv('VIRTUAL_HOST') ?>"/>- Loading</span>
              </p>
              <p>
                  <strong>Site URL - </strong>
                  <a href="<?php echo $_SERVER['REQUEST_SCHEME'] . '://' . strtolower($site) . '.' . getenv('VIRTUAL_HOST') ?>"
                     target="_blank"
                  >
                    <?php echo $_SERVER['REQUEST_SCHEME'] . '://' . strtolower($site) . '.' . getenv('VIRTUAL_HOST') ?>
                  </a>
              </p>
            <?php if ($site === "FRONTEND" || $site === "BACKEND"): ?>
                <p><strong>Starter
                        - </strong> <?php echo getenv("{$site}_STARTER"); ?></p>
                <p><strong>Directory -</strong>
                  <?php echo strtolower($site); ?>/starters/<?php echo getenv("{$site}_STARTER"); ?>/ </p>
            <?php else: ?>
                <p><strong>Directory
                        - </strong> <?php echo strtolower($site); ?>/</p>
            <?php endif ?>
          </div>
      <?php endforeach; ?>
        <div class="card">
            <p class="title">
                DB
            </p>
            <p><strong>Database
                    - </strong><?php echo getenv('MYSQL_DATABASE') ?></p>
            <p><strong>Host - </strong><?php echo getenv('MYSQL_HOST') ?></p>
            <p><strong>Username - </strong><?php echo getenv('MYSQL_USER') ?>
            </p>
            <p><strong>Password
                    - </strong><?php echo getenv('MYSQL_PASSWORD') ?></p>
        </div>
    </div>

    <H2>System info</H2>

    <div class="card">
        <p><strong>PHP Version - </strong><?php echo getenv('PHP_VERSION') ?>
        </p>
        <p><strong>Composer Version
                - </strong><?php echo getenv('COMPOSER2_VERSION') ?></p>
        <p><strong>XDebug
                - </strong><?php echo getenv('XDEBUG_ENABLED') ? 'Enabled' : 'Disabled'; ?>
        </p>
        <p><strong>Drush Version
                - </strong><?php echo getenv('DRUSH_VERSION') ?></p>
        <p><strong>Node Version - </strong><?php echo getenv('NODE_VERSION') ?>
        </p>
        <!--        --><?php //phpinfo() ?>
    </div>

</div>
<script>

  var statuses = document.querySelectorAll('*[id^="status"]');

  setInterval(function(){
    statuses.forEach(function(status) {
      fetch(status.dataset.service_url, { method: 'HEAD' } ).then(function(response) {
        if(response.ok) {
          document.getElementById(status.id).innerHTML = " - Up";
        } else {
          document.getElementById(status.id).innerHTML = " - Loading";
        }
      }).catch((error) => {
        document.getElementById(status.id).innerHTML = " - Down";
      });
    });
  }, 30000);


</script>
</body>
</html>