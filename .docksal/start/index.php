<?php
$sites = [
  'FRONTEND',
  'BACKEND',
  'DOCS',
];
?>
<!DOCTYPE html>
<html>

<style>
    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        text-decoration: underline;
    }

    .card {
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
        padding: 1rem;
    }

    .title {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 0.875rem;
        letter-spacing: 0.025em;
        color: #69778c;
    }
</style>

<head>
    <title>Power Stack — Dashboard</title>
</head>

<body style='
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    font-size: 18px;
    background: #f0f2fd;
'>

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
          <div class="card">
              <p class="title">
                <?php echo $site ?>
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
                        - </strong> <?php echo getenv("${site}_STARTER"); ?></p>
                <p><strong>Directory -</strong> <?php echo strtolower($site); ?>
                    /starters/<?php echo getenv("${site}_STARTER"); ?>/ </p>
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
</body>
</html>