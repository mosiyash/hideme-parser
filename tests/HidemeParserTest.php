<?php

namespace Mosiyash\HidemeParser;

class HidemeParserTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var HidemeParser
     */
    protected $hidemeParser;

    /**
     * @inheritdoc
     */
    protected function setUp()
    {
        parent::setUp();

        $this->hidemeParser = new HidemeParser(dirname(__DIR__).'/var/cache');
    }

    /**
     * @covers HidemeParser::loadTableData()
     */
    public function testLoadTableData()
    {
        $htmlContent = file_get_contents(__DIR__.'/data/proxylist_page0.html');
        $data = $this->hidemeParser->loadTableData($htmlContent);

        $this->assertInternalType('array', $data);
        $this->assertCount(64, $data);

        /** @var Ip $ip */
        $ip = $data[0];
        $this->assertInstanceOf(Ip::class, $ip);
        $this->assertSame('205.201.36.227', $ip->getAddress());
        $this->assertSame(53281, $ip->getPort());
        $this->assertSame('United States', $ip->getCountry());
        $this->assertSame('Tropic', $ip->getCity());
        $this->assertSame(5100, $ip->getSpeed());
        $this->assertSame(Ip::TYPE_HTTP, $ip->getType());
        $this->assertSame(Ip::ANONIMITY_HIGH, $ip->getAnonimity());

        /** @var Ip $ip */
        $ip = $data[63];
        $this->assertInstanceOf(Ip::class, $ip);
        $this->assertSame('201.158.27.133', $ip->getAddress());
        $this->assertSame(4145, $ip->getPort());
        $this->assertSame('Brazil', $ip->getCountry());
        $this->assertSame(null, $ip->getCity());
        $this->assertSame(1400, $ip->getSpeed());
        $this->assertSame(Ip::TYPE_SOCKS4, $ip->getType());
        $this->assertSame(Ip::ANONIMITY_HIGH, $ip->getAnonimity());
    }

    /**
     * @covers HidemeParser::getPaginationLinks()
     */
    public function testGetPaginationLiks()
    {
        $htmlContent = file_get_contents(__DIR__.'/data/proxylist_page0.html');
        $paginationLinks = $this->hidemeParser->getPaginationLinks($htmlContent);

        $this->assertInternalType('array', $paginationLinks);
        $this->assertCount(135, $paginationLinks);

        foreach ($paginationLinks as $url) {
            $this->assertRegExp('/start=\d+/', $url);
        }
    }

    /**
     * @covers HidemeParser::updateCache()
     * @covers HidemeParser::count()
     * @covers HidemeParser::all()
     */
    public function testCache()
    {
        $this->hidemeParser->updateCache([]);
        $this->assertSame(0, $this->hidemeParser->count());

        $updateIpList = [
            new Ip('127.0.0.1', 8080, 'Russia', 'Novosibirsk', 500, Ip::TYPE_SOCKS4, Ip::ANONIMITY_HIGH),
            new Ip('127.0.0.1', 80, 'Russia', 'Tomsk', 1500, Ip::TYPE_HTTPS, Ip::ANONIMITY_MEDIUM),
        ];
        $this->hidemeParser->updateCache($updateIpList);

        $this->assertSame(2, $this->hidemeParser->count());

        /** @var Ip[] $data */
        $data = $this->hidemeParser->all();

        $this->assertSame('127.0.0.1', $data[0]->getAddress());
        $this->assertSame(8080, $data[0]->getPort());
        $this->assertSame('Russia', $data[0]->getCountry());
        $this->assertSame('Novosibirsk', $data[0]->getCity());
        $this->assertSame(500, $data[0]->getSpeed());
        $this->assertSame('SOCKS4', $data[0]->getType());
        $this->assertSame('high', $data[0]->getAnonimity());

        $this->assertSame('127.0.0.1', $data[1]->getAddress());
        $this->assertSame(80, $data[1]->getPort());
        $this->assertSame('Russia', $data[1]->getCountry());
        $this->assertSame('Tomsk', $data[1]->getCity());
        $this->assertSame(1500, $data[1]->getSpeed());
        $this->assertSame('HTTPS', $data[1]->getType());
        $this->assertSame('medium', $data[1]->getAnonimity());
    }
}
