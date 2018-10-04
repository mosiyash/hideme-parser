<?php

namespace Mosiyash\HidemeParser;

use Symfony\Component\DomCrawler\Crawler;

final class HidemeParser
{
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
}
