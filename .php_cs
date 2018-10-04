<?php

$finder = PhpCsFixer\Finder::create()
    ->exclude('tests/data')
    ->exclude('vendor')
    ->in(__DIR__)
;

$config = PhpCsFixer\Config::create()
    ->setCacheFile(__DIR__.'/.php_cs.cache')
    ->setRiskyAllowed(true)
    ->setRules([
        '@Symfony' => true,
        'full_opening_tag' => false,
    ])
    ->setFinder($finder)
;

// special handling of fabbot.io service if it's using too old PHP CS Fixer version
if (false !== getenv('FABBOT_IO')) {
    try {
        PhpCsFixer\FixerFactory::create()
            ->registerBuiltInFixers()
            ->registerCustomFixers($config->getCustomFixers())
            ->useRuleSet(new PhpCsFixer\RuleSet($config->getRules()));
    } catch (PhpCsFixer\ConfigurationException\InvalidConfigurationException $e) {
        $config->setRules([]);
    } catch (UnexpectedValueException $e) {
        $config->setRules([]);
    } catch (InvalidArgumentException $e) {
        $config->setRules([]);
    }
}

return $config;
