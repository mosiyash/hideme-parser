<?php

namespace Mosiyash\HidemeParser;

final class Ip
{
    public const TYPE_HTTP = 'HTTP';
    public const TYPE_HTTPS = 'HTTPS';
    public const TYPE_SOCKS4 = 'SOCKS4';
    public const TYPE_SOCKS5 = 'SOCKS5';

    public const ANONIMITY_HIGH = 'high';
    public const ANONIMITY_MEDIUM = 'medium';
    public const ANONIMITY_LOW = 'low';
    public const ANONIMITY_NO = 'no';

    public static $anonimityValues = [
        // Russian
        'Высокая' => self::ANONIMITY_HIGH,
        'Средняя' => self::ANONIMITY_MEDIUM,
        'Низкая' => self::ANONIMITY_LOW,
        'Нет' => self::ANONIMITY_NO,

        // English
        'High' => self::ANONIMITY_HIGH,
        'Medium' => self::ANONIMITY_MEDIUM,
        'Low' => self::ANONIMITY_LOW,
        'No' => self::ANONIMITY_NO,

        // Ukrainian
        'Висока' => self::ANONIMITY_HIGH,
        'Середня' => self::ANONIMITY_MEDIUM,
        'Низька' => self::ANONIMITY_LOW,
        'Немає' => self::ANONIMITY_NO,

        // Español
        'Alto' => self::ANONIMITY_HIGH,
        'Medio' => self::ANONIMITY_MEDIUM,
        'Bajo' => self::ANONIMITY_LOW,
    ];

    /**
     * @var string
     */
    private $address;

    /**
     * @var int
     */
    private $port;

    /**
     * @var string
     */
    private $country;

    /**
     * @var null|string
     */
    private $city;

    /**
     * @var int
     */
    private $speed;

    /**
     * @var string
     */
    private $type;

    /**
     * @var string
     */
    private $anonimity;

    /**
     * Ip constructor.
     *
     * @param string      $address
     * @param int         $port
     * @param string      $country
     * @param null|string $city
     * @param int         $speed
     * @param string      $type
     * @param string      $anonimity
     */
    public function __construct(
        string $address,
        int $port,
        string $country,
        ?string $city,
        int $speed,
        string $type,
        string $anonimity
    ) {
        $this->address = $address;
        $this->port = $port;
        $this->country = $country;
        $this->city = $city;
        $this->speed = $speed;
        $this->type = $type;
        $this->anonimity = $anonimity;
    }

    /**
     * @return string
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @return int
     */
    public function getPort(): int
    {
        return $this->port;
    }

    /**
     * @return string
     */
    public function getCountry(): string
    {
        return $this->country;
    }

    /**
     * @return null|string
     */
    public function getCity(): ?string
    {
        return $this->city;
    }

    /**
     * @return int
     */
    public function getSpeed(): int
    {
        return $this->speed;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return string
     */
    public function getAnonimity(): string
    {
        return $this->anonimity;
    }
}
