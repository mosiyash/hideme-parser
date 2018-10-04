<?php

namespace Mosiyash\HidemeParser;

use GuzzleHttp\Client;
use function str_replace;
use Symfony\Component\Cache\Simple\FilesystemCache;
use Symfony\Component\DomCrawler\Crawler;

final class HidemeParser
{
    /**
     * @var FilesystemCache
     */
    private $cache;

    /**
     * @var string
     */
    private $cachePath;

    /**
     * @var Client
     */
    private $client;

    /**
     * @param string      $cachePath
     * @param null|Client $client
     */
    public function __construct(string $cachePath, Client $client = null)
    {
        $this->cachePath = $cachePath;
        $this->cache = new FilesystemCache('', 0, $this->cachePath);
        $this->client = $client;

        if (null === $this->client) {
            $this->client = new Client();
        }
    }

    /**
     * @param string $html
     *
     * @return string[]
     */
    public function getPaginationLinks(string $html): array
    {
        $crawler = new Crawler($html);
        $perPage = $crawler->filter('table.proxy__t tbody tr')->count();
        $lastPageNum = (int) $crawler->filter('.proxy__pagination ul li')->last()->text();

        $urlPattern = preg_replace(
            '/start=\d+/',
            'start={n}',
            $crawler->filter('.proxy__pagination ul li a')->attr('href')
        );

        $data = [];

        for ($i = 1; $i <= $lastPageNum; ++$i) {
            $url = str_replace(
                '{n}',
                $i * $perPage - $perPage,
                $urlPattern
            );

            $data[] = $url;
        }

        return $data;
    }

    /**
     * @param string $html
     *
     * @return Ip[]
     */
    public function loadTableData(string $html): array
    {
        $data = [];

        $crawler = new Crawler($html);
        $crawler->filter('table.proxy__t tbody tr')->each(function (Crawler $crawler) use (&$data) {
            $address = trim($crawler->filter('td')->eq(0)->text());
            $port = (int) trim($crawler->filter('td')->eq(1)->text());

            $country = trim(
                str_replace(
                    ["\n", ' '],
                    ['', ''],
                    strip_tags(
                        preg_replace(
                            '/<span.*?>.*?<\/span>/',
                            '',
                            $crawler->filter('td')->eq(2)->html()
                        )
                    )
                )
            );

            $city = trim($crawler->filter('td')->eq(2)->filter('span')->eq(1)->text());
            $city = ('' === $city) ? null : $city;

            $speed = (int) trim($crawler->filter('td')->eq(3)->filter('p')->eq(0)->text());
            $type = trim($crawler->filter('td')->eq(4)->text());
            $anonimity = Ip::$anonimityValues[trim($crawler->filter('td')->eq(5)->text())];

            $data[] = new Ip(
                $address,
                $port,
                $country,
                $city,
                $speed,
                $type,
                $anonimity
            );
        });

        return $data;
    }

    public function updateCache(array $ipList): bool
    {
        return $this->cache->set('hideme_parser.ip_list', $ipList);
    }

    public function count(): int
    {
        return count($this->cache->get('hideme_parser.ip_list', []));
    }

    public function all(): array
    {
        return $this->cache->get('hideme_parser.ip_list', []);
    }
}
